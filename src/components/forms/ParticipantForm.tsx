import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addParticipant } from '../../features/participantSlice';
import { useI18n } from '../../i18n/i18n';
import { ParticipantType } from '../../utils/ParticipantType';
import { Button } from '../shared/Button';
import { EmojiInput } from './EmojiInput';

type ParticipantFormValues = { participantName: string; };

const validationSchema = yup.object().shape({
    participantName: yup.string().required('Team name is required').min(2, 'Team name must be at least 2 characters'),
});

type Props = {
    tournamentId: string;
    participants: ParticipantType[];
};

const ParticipantForm = ({ tournamentId, participants }: Props) => {
    const { t } = useI18n();

    const [error, setError] = useState<string | undefined>();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ParticipantFormValues>({ resolver: yupResolver(validationSchema) });

    const handleAddParticipant = (name: string) => {
        setError(undefined);
        const isDuplicate = participants.some(
            (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase() && p.tournamentId === tournamentId
        );
        if (isDuplicate) {
            setError('This participant already exists!');
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
                        fieldSize="sm"
                        placeHolder={t(`forms.participant.placeholder`)}
                        {...nameField}
                        ref={rhfRef}
                        error={error ?? errors.participantName?.message}
                        style={{ flex: 1 }}
                    />

                    <Button
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
