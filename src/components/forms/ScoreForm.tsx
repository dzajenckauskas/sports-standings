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
};

type FormValues = {
    homeParticipantId: string;
    awayParticipantId: string;
    homeParticipantScore: number | string;
    awayParticipantScore: number | string;
};

const ScoreForm = ({ participants, tournamentId }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    // const matches = useSelector((state: RootState) =>
    //     state.scores.filter((m) => m.tournamentId === tournamentId)
    // );

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        defaultValues: { homeParticipantId: "", awayParticipantId: "", homeParticipantScore: "", awayParticipantScore: "" },
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
            <h3>Add participant</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                    <Controller
                        name="homeParticipantId"
                        control={control}
                        render={({ field }) => (
                            <select {...field}>
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
                </div>

                <div style={{ flex: 1 }}>
                    <Controller
                        name="awayParticipantId"
                        control={control}
                        render={({ field }) => (
                            <select {...field}>
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
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                    <Controller
                        name="homeParticipantScore"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type="number" placeholder="Home Score" inputMode="numeric" />
                        )}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Controller
                        name="awayParticipantScore"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type="number" placeholder="Away Score" inputMode="numeric" />
                        )}
                    />
                </div>
            </div>

            <Button type="submit">Add Score</Button>
        </form>
    );
};

export default ScoreForm;
