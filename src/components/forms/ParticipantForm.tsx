import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addParticipant } from '../../features/participantSlice';
import { TType } from '../../types/TType';
import { ParticipantType } from '../../utils/ParticipantType';
import { Button } from '../shared/Button';
import { EmojiInput } from './EmojiInput';

type ParticipantFormValues = { participantName: string; };

type Props = {
    tournamentId: string;
    participants: ParticipantType[];
    t: TType;
};

const ParticipantForm = ({ tournamentId, participants, t }: Props) => {
    const validationSchema = yup.object().shape({
        participantName: yup.string().required(`${t('forms.errors.participantRequired')}`)
            .min(2, `${t('forms.errors.participantNameTooShort')}`),
    });
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setError
    } = useForm<ParticipantFormValues>({
        resolver: yupResolver(validationSchema),
        reValidateMode: 'onChange'
    });

    const handleAddParticipant = (name: string) => {
        const isDuplicate = participants.some(
            (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase() && p.tournamentId === tournamentId
        );
        if (isDuplicate) {
            setError('participantName', {
                message: `${t('forms.errors.participantNameTaken')}`
            });
            return;
        }
        const newParticipant: ParticipantType = { id: crypto.randomUUID(), name, tournamentId };
        dispatch(addParticipant(newParticipant));
        reset();
    };

    const onSubmit = (data: ParticipantFormValues) => handleAddParticipant(data.participantName);

    const { ref: rhfRef, ...nameField } = register("participantName");
    return (
        <div>
            <h3>{t(`forms.participant.title`)}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', display: 'flex', gap: 8 }}>

                    <EmojiInput
                        t={t}
                        fieldSize="sm"
                        placeHolder={t(`forms.participant.placeholder`) ?? ''}
                        {...nameField}
                        ref={rhfRef}
                        error={errors.participantName?.message}
                        style={{ flex: 1 }}
                    />

                    <Button
                        t={t}
                        variant='primary'
                        disabled={!watch("participantName")}
                        type="submit" size="sm">
                        {t('actions.add')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ParticipantForm;
