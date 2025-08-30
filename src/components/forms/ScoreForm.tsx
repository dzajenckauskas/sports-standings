import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../../features/scoreSlice";
import { AppDispatch, RootState } from "../../store";
import { ParticipantType } from "../../utils/ParticipantType";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Option } from "../shared/Option";
import { Select } from "../shared/Select";
import { TType } from "../../types/TType";

type Props = {
    participants: ParticipantType[];
    tournamentId: string;
    disabled?: boolean;
    t: TType;
};

type FormValues = {
    homeParticipantId: string;
    awayParticipantId: string;
    homeParticipantScore: number | string;
    awayParticipantScore: number | string;
};

const ScoreForm = ({ participants, tournamentId, disabled, t }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const matches = useSelector((state: RootState) =>
        state.scores.filter((m) => m.tournamentId === tournamentId)
    );

    // Precompute a fast-lookup of games already played.
    // For each match we store an order-independent key in a Set: "A|B" where A and B
    // are participant IDs sorted alphabetically. This way (home=A, away=B) and (home=B, away=A)
    // map to the same key. Lookup is O(1) and the whole structure is rebuilt only when
    // `matches` changes.
    const playedPairs = useMemo(() => {
        const s = new Set<string>();
        for (const m of matches) {
            const key =
                [m.homeParticipantId, m.awayParticipantId].sort().join("|");
            s.add(key);
        }
        return s;
    }, [matches]);

    // Memoized helper: checks whether two participants have already
    // played each other in this tournament. It normalizes the pair
    // order (A|B === B|A) by sorting IDs, then looks up that key in
    // the precomputed set `playedPairs`. Memoized with `useCallback`
    // so effects/select filters depending on it get a stable reference.
    const hasPlayed = useCallback((a?: string, b?: string) => {
        if (!a || !b) return false;
        const key = [a, b].sort().join("|");
        return playedPairs.has(key);
    }, [playedPairs]);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        clearErrors
    } = useForm<FormValues>({
        defaultValues: {
            homeParticipantId: "",
            awayParticipantId: "",
            homeParticipantScore: "",
            awayParticipantScore: ""
        },
    });

    const homeParticipantId = watch('homeParticipantId')
    const awayParticipantId = watch('awayParticipantId')
    const homeParticipantScore = watch('homeParticipantScore')
    const awayParticipantScore = watch('awayParticipantScore')

    // detect unexpectedly invalid pairs
    useEffect(() => {
        if (
            homeParticipantId &&
            awayParticipantId &&
            hasPlayed(homeParticipantId, awayParticipantId)
        ) {
            setValue("awayParticipantId", "");
            setError("awayParticipantId", {
                type: "manual",
                message: `${t('forms.errors.pairAlreadyPlayed')}`
            });
        } else {
            clearErrors("awayParticipantId");
        }
    }, [t, homeParticipantId, awayParticipantId, hasPlayed, setValue, setError, clearErrors]);

    const onSubmit = (data: FormValues) => {
        // prevent submitting a duplicate pair
        if (hasPlayed(data.homeParticipantId, data.awayParticipantId)) {
            setError("awayParticipantId", {
                type: "manual",
                message: `${t('forms.errors.pairAlreadyPlayed')}`
            });
            return;
        }
        dispatch(
            addMatch({
                tournamentId,
                homeParticipantId: data.homeParticipantId,
                awayParticipantId: data.awayParticipantId,
                homeParticipantScore: Number(data.homeParticipantScore),
                awayParticipantScore: Number(data.awayParticipantScore),
            })
        );
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3>{t('forms.score.title')}</h3>
            <div style={{ display: "flex", marginBottom: 8, gap: 8, width: "100%" }}>
                <Controller
                    name="homeParticipantId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            variant="light"
                            fieldSize="sm"
                            placeholder={t(`forms.score.selectHomeParticipant`) ?? ''}
                            disabled={disabled}
                        >
                            {participants
                                ?.filter((v) => v.id !== awayParticipantId)
                                .filter((p) => (awayParticipantId ? !hasPlayed(p.id, awayParticipantId) : true))
                                .map((p) => (
                                    <Option key={p.id} value={p.id}>
                                        {p.name}
                                    </Option>
                                ))}
                        </Select>
                    )}
                />

                <Controller
                    name="awayParticipantId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            variant="light"
                            fieldSize="sm"
                            placeholder={t(`forms.score.selectAwayParticipant`) ?? ''}
                            disabled={disabled}
                        >
                            {participants
                                ?.filter((p) => p.id !== homeParticipantId)
                                .filter((p) => !hasPlayed(homeParticipantId, p.id))
                                .map((p) => (
                                    <Option key={p.id} value={p.id}>
                                        {p.name}
                                    </Option>
                                ))}
                        </Select>
                    )}
                />
            </div>
            <div style={{
                display: "flex", marginBottom: 8, gap: 8, width: '100%'
            }}>
                <Controller
                    name="homeParticipantScore"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            fieldSize="sm"
                            type="text" // use text so we can fully control allowed chars
                            inputMode="numeric" // mobile keyboards show numbers only
                            pattern="[0-9]*"
                            disabled={disabled || !homeParticipantId}
                            placeHolder={t('forms.score.homeScore') ?? ''}
                            onChange={(e) => {
                                const raw = e.target.value;
                                // only digits allowed
                                const cleaned = raw.replace(/\D/g, "");
                                field.onChange(cleaned);
                            }}
                        />
                    )}
                />

                <Controller
                    name="awayParticipantScore"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            fieldSize="sm"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            disabled={disabled || !awayParticipantId}
                            placeHolder={t('forms.score.awayScore') ?? ''}
                            onChange={(e) => {
                                const raw = e.target.value;
                                const cleaned = raw.replace(/\D/g, "");
                                field.onChange(cleaned);
                            }}
                        />
                    )}
                />
            </div>

            <Button type="submit"
                t={t}
                size="sm"
                style={{ width: '100%' }}
                disabled={
                    disabled || !homeParticipantId || !awayParticipantId ||
                    !awayParticipantScore || !homeParticipantScore
                }>
                {t('actions.addScore')}
            </Button>
        </form>
    );
};

export default ScoreForm;
