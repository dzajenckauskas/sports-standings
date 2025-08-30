import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addParticipant } from '../../features/participantSlice';
import { TType } from '../../types/TType';
import { ParticipantType } from '../../types/ParticipantType';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Typography } from '../shared/Typography';
import { useTheme } from 'styled-components';

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
    const theme = useTheme()
    const { ref: rhfRef, ...nameField } = register("participantName");
    return (
        <div>
            <Typography variant="h3" weight="bold">{t('forms.participant.title')}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', display: 'flex', gap: 8 }}>
                    <Input
                        fieldSize={theme.ui?.layout.inputsSize}
                        placeHolder={t(`forms.participant.placeholder`) ?? ''}
                        {...nameField}
                        ref={rhfRef}
                        error={errors.participantName?.message}
                        style={{ flex: 1 }}
                    />
                    {/* <EmojiInput
                        t={t}
                        fieldSize={theme.ui?.layout.inputsSize}
                        placeHolder={t(`forms.participant.placeholder`) ?? ''}
                        {...nameField}
                        ref={rhfRef}
                        error={errors.participantName?.message}
                        style={{ flex: 1 }}
                    /> */}
                    <Button
                        t={t}
                        variant='secondary'
                        disabled={!watch("participantName")}
                        type="submit" size={theme.ui?.layout.inputsSize}>
                        {t('actions.add')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ParticipantForm;
