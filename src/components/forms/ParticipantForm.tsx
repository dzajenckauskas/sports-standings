import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addParticipant } from '../../features/participantSlice';
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
    const [error, setError] = useState<string | undefined>();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<ParticipantFormValues>({ resolver: yupResolver(validationSchema) });

    const participantName = watch('participantName');

    // Get RHF's ref for the field, then compose it with our own to keep a DOM handle.
    const inputRef = useRef<HTMLInputElement | null>(null);

    const composeRef = (el: HTMLInputElement | null) => {
        // pass to RHF
        rhfRef(el);
        // keep our own reference for cursor ops
        inputRef.current = el;
    };

    const insertAtCursor = (emoji: string) => {
        const el = inputRef.current;
        if (!el) return;
        const start = el.selectionStart ?? el.value.length;
        const end = el.selectionEnd ?? el.value.length;
        const before = el.value.slice(0, start);
        const after = el.value.slice(end);
        const next = `${before}${emoji} ${after}`;
        setValue('participantName', next, { shouldDirty: true, shouldValidate: true });
        const pos = start + emoji.length + 1;
        requestAnimationFrame(() => { el.setSelectionRange(pos, pos); el.focus(); });
    };

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
            <h3>Add participant</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', display: 'flex' }}>

                    <EmojiInput
                        fieldSize="sm"
                        placeHolder="Participant name"
                        {...nameField}
                        ref={rhfRef}  // ✅ RHF ref attaches to the real <input/>
                        error={error ?? errors.participantName?.message}
                        style={{ flex: 1 }}
                    />

                    <Button disabled={!watch("participantName")} type="submit" size="sm">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ParticipantForm;