import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMatch } from "../../features/scoreSlice";
import { AppDispatch } from "../../store";
import { ParticipantType } from "../../utils/ParticipantType";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

type Props = {
    participants: ParticipantType[];
    tournamentId: string;
    disabled?: boolean;
};

type FormValues = {
    homeParticipantId: string;
    awayParticipantId: string;
    homeParticipantScore: number | string;
    awayParticipantScore: number | string;
};

const ScoreForm = ({ participants, tournamentId, disabled }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    // const matches = useSelector((state: RootState) =>
    //     state.scores.filter((m) => m.tournamentId === tournamentId)
    // );

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            homeParticipantId: "",
            awayParticipantId: "",
            homeParticipantScore: "",
            awayParticipantScore: ""
        },
    });



    const onSubmit = (data: FormValues) => {
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
            <h3>Add score</h3>
            <div style={{ display: "flex", marginBottom: 8, gap: 8, width: '100%' }}>
                <Controller
                    name="homeParticipantId"
                    control={control}
                    render={({ field }) => (
                        <select {...field} style={{ width: '100%' }}
                            disabled={disabled}>
                            <option value="">Home Team</option>
                            {participants.map((p) => (
                                <option
                                    key={p.id}
                                    value={p.id}
                                >
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    )}
                />

                <Controller
                    name="awayParticipantId"
                    control={control}
                    render={({ field }) => (
                        <select {...field} style={{ width: '100%' }}
                            disabled={disabled}>
                            <option value="">Away Team</option>
                            {participants.map((p) => (
                                <option
                                    key={p.id}
                                    value={p.id}
                                >
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div style={{ display: "flex", marginBottom: 8, gap: 8, width: '100%' }}>
                <Controller
                    name="homeParticipantScore"
                    control={control}
                    render={({ field }) => (
                        <Input {...field}
                            type="number"
                            min={0}
                            disabled={disabled}
                            placeholder="Home Score"
                        />
                    )}
                />
                <Controller
                    name="awayParticipantScore"
                    control={control}
                    render={({ field }) => (
                        <Input {...field}
                            type="number"
                            min={0}
                            disabled={disabled}
                            placeholder="Away Score"
                        />
                    )}
                />
            </div>

            <Button type="submit" disabled={disabled}>Add Score</Button>
        </form>
    );
};

export default ScoreForm;
