import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import * as yup from 'yup';
import { addParticipant } from '../../features/participantSlice';
import { ParticipantInputType, ParticipantOptionType, ParticipantType } from '../../types/ParticipantType';
import { TType } from '../../types/TType';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Option } from "../shared/Option";
import { Select } from '../shared/Select';
import { Typography } from '../shared/Typography';
import { EmojiInput } from './EmojiInput';

type ParticipantFormValues = { participantName: string; };

type Props = {
    tournamentId: string;
    participants: ParticipantType[];
    t: TType;
    participantInputType: ParticipantInputType;
    participantOptions?: ParticipantOptionType[];
};

const ParticipantForm = (
    { tournamentId, participants, t, participantInputType, participantOptions }: Props
) => {
    const validationSchema = yup.object().shape({
        participantName: yup.string()
            .required(`${t('forms.errors.participantRequired')}`)
            .min(2, `${t('forms.errors.participantNameTooShort')}`),
    });
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setError,
        setValue,
        getValues
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
    const onInvalid: SubmitErrorHandler<ParticipantFormValues> = (data) => {
        console.log('invalid', data, getValues())
    }
    const { ref: rhfRef, ...nameField } = register("participantName");
    return (
        <div>
            <Typography variant="h3" weight="bold">{t('forms.participant.title')}</Typography>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div style={{ width: '100%', display: 'flex', gap: 8 }}>
                    {participantInputType === "text" &&
                        <Input
                            fieldSize={theme.ui?.layout.inputsSize}
                            placeholder={t(`forms.participant.placeholder`) ?? ''}
                            {...nameField}
                            ref={rhfRef}
                            error={errors.participantName?.message}
                            style={{ flex: 1, minWidth: 100 }}
                        />}
                    {(participantInputType === "select" && !!participantOptions) &&
                        <Select
                            variant="light"
                            fieldSize={theme.ui?.layout.inputsSize}
                            error={errors.participantName?.message}
                            value={watch('participantName') ?? ''}
                            onChange={(e) => {
                                setValue('participantName', e.target.value, { shouldValidate: true, shouldDirty: true });
                            }}
                        >
                            <>
                                <Option disabled value={""}>
                                    {t(`forms.participant.placeholder`) ?? ''}
                                </Option>
                                {participantOptions
                                    ?.filter(v =>
                                        !participants.some(pp =>
                                            pp.name.toLowerCase().includes(v.name.toLowerCase())
                                        )
                                    )
                                    ?.map((p) => (
                                        <Option key={p.code ?? p.name} value={`${p.flag ?? ''}${p.name}`}>
                                            {p.flag ?? ''}{p.name}
                                        </Option>
                                    ))}
                            </>
                        </Select>}
                    {participantInputType === "emoji" &&
                        <EmojiInput
                            t={t}
                            fieldSize={theme.ui?.layout.inputsSize}
                            placeHolder={t(`forms.participant.placeholder`) ?? ''}
                            {...nameField}
                            ref={rhfRef}
                            error={errors.participantName?.message}
                            style={{ flex: 1 }}
                        />}
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
