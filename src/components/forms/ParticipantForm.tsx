import { useForm } from 'react-hook-form';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    onAddParticipant?: (name: string) => void;
}

const ParticipantForm = ({ onAddParticipant }: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ParticipantFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: ParticipantFormValues) => {
        onAddParticipant?.(data.participantName);
        reset();
    };

    return (
        <div>
            <p>Add team</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex' }}>
                    <Input
                        placeHolder='Team name'
                        {...register('participantName')}
                        error={errors.participantName?.message}
                    />
                    <Button text='Add' type='submit' />
                </div>
            </form>
        </div>
    );
}

export default ParticipantForm;