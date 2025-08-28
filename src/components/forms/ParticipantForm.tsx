import { useForm } from 'react-hook-form';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { ParticipantType } from '../../utils/ParticipantType';
import { addParticipant } from '../../features/participantSlice';
import { useState } from 'react';

type ParticipantFormValues = {
    participantName: string;
};

const validationSchema = yup.object().shape({
    participantName: yup
        .string()
        .required('Team name is required')
        .min(2, 'Team name must be at least 2 characters'),
});

type Props = {
    tournamentId: string;
    participants: ParticipantType[]
}

const ParticipantForm = ({ tournamentId, participants }: Props) => {
    const [error, setError] = useState<string | undefined>()

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ParticipantFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const handleAddParticipant = (name: string) => {
        setError(undefined)
        const isDuplicate = participants.some(
            (p) =>
                p.name.trim().toLowerCase() === name.trim().toLowerCase() &&
                p.tournamentId === tournamentId
        );

        if (isDuplicate) {
            setError('This participant already exists!');
            return;
        }

        const newParticipant: ParticipantType = {
            id: crypto.randomUUID(),
            name,
            tournamentId,
        };

        dispatch(addParticipant(newParticipant));
        reset();

    };



    const onSubmit = (data: ParticipantFormValues) => {
        handleAddParticipant?.(data.participantName);
    };

    return (
        <div>
            <h3>Add participant</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Input
                        fieldSize='md'
                        placeHolder='Participant name'
                        {...register('participantName')}
                        error={error ?? errors.participantName?.message}
                    />
                    <Button
                        type='submit' size='md'>
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ParticipantForm;