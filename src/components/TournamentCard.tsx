import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { AppTheme } from "../theme/types";
import { StandingsRowType } from "../utils/StandingsRowType";
import PastMatchesList from "./PastMatchesList";
import StandingsTable from "./StandingsTable";
import ParticipantForm from "./forms/ParticipantForm";
import ScoreForm from "./forms/ScoreForm";
import { Button } from "./shared/Button";
import Card from "./shared/Card";
import { PlusIcon } from "./shared/icons/PlusIcon";
import { useTranslation } from "react-i18next";

type Props = {
    tournamentId: string;
    showFormToggleButtons?: boolean;
    hidePastMatches?: boolean;
    titleIcon?: React.ReactNode;
    namespace: string;
};

/** Inherit the theme’s font for everything inside the card */
const FontScope = styled.div(({ theme }) => ({
    fontFamily: (theme as AppTheme).typography?.fontFamily ?? "system-ui, sans-serif",
    "*": { fontFamily: "inherit" },
}));

const TournamentCard = ({
    tournamentId,
    showFormToggleButtons,
    titleIcon,
    namespace,
    hidePastMatches
}: Props) => {
    const { t } = useTranslation(namespace)
    const [showParticipantForm, setShowParticipantForm] = useState(!showFormToggleButtons);
    const [showScoreForm, setShowScoreForm] = useState(!showFormToggleButtons);

    const toggleParticipantForm = () => setShowParticipantForm((v) => !v);
    const toggleScoreForm = () => setShowScoreForm((v) => !v);

    const participants = useSelector((state: RootState) =>
        state.participants.filter((p) => p.tournamentId === tournamentId)
    );

    const matches = useSelector(
        (state: RootState) => state.scores?.filter((m) => m.tournamentId === tournamentId) ?? []
    );

    const standings: StandingsRowType[] = useMemo(() => {
        const base: Record<string, StandingsRowType> = {};
        for (const p of participants) {
            base[p.id] = {
                id: p.id,
                name: p.name,
                games: 0,
                wins: 0,
                losses: 0,
                draws: 0,
                points: 0,
            };
        }

        for (const m of matches) {
            const home = base[m.homeParticipantId];
            const away = base[m.awayParticipantId];
            if (!home || !away) continue;

            home.games += 1;
            away.games += 1;

            if (m.homeParticipantScore > m.awayParticipantScore) {
                home.wins += 1;
                home.points += 3;
                away.losses += 1;
            } else if (m.homeParticipantScore < m.awayParticipantScore) {
                away.wins += 1;
                away.points += 3;
                home.losses += 1;
            } else {
                home.draws += 1;
                home.points += 1;
                away.draws += 1;
                away.points += 1;
            }
        }
        return Object.values(base).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.wins !== a.wins) return b.wins - a.wins;
            return a.name.localeCompare(b.name);
        });
    }, [participants, matches]);

    const getParticipantName = (id: string) => participants?.find((p) => p.id === id)?.name;

    return (
        <FontScope>
            <Card title={t(`singularTitle`)} icon={titleIcon}>
                {showFormToggleButtons && (
                    <div style={{
                        display: "flex", width: "100%",
                        justifyContent: "space-between",
                        paddingBottom: 8
                    }}>
                        <Button
                            t={t}
                            variant="secondary"
                            size="sm"
                            active={showParticipantForm}
                            onClick={toggleParticipantForm}
                            startIcon={<PlusIcon size={20} />}
                        >
                            {t(`actions.addParticipant`)}
                        </Button>
                        <Button
                            t={t}
                            variant="secondary"
                            size="sm"
                            disabled={participants?.length === 0}
                            active={showScoreForm}
                            onClick={toggleScoreForm}
                            startIcon={<PlusIcon size={20} />}
                        >
                            {t(`actions.addScore`)}
                        </Button>
                    </div>
                )}

                <div style={{
                    display: "flex", flexDirection: "column",
                    gap: 8
                }}>

                    {showParticipantForm && (
                        <ParticipantForm
                            t={t}
                            participants={participants}
                            tournamentId={tournamentId}
                        />
                    )}

                    {showScoreForm && (
                        <ScoreForm
                            t={t}
                            disabled={participants?.length === 0}
                            participants={participants}
                            tournamentId={tournamentId}
                        />
                    )}
                </div>

                <div style={{
                    display: "flex", flexDirection: "column",
                    gap: 16,
                    paddingTop: showFormToggleButtons ? 0 : 8
                }}>
                    {!hidePastMatches &&
                        <PastMatchesList t={t}
                            matches={matches}
                            getParticipantName={getParticipantName}
                        />}
                    <StandingsTable t={t}
                        participants={participants}
                        standings={standings}
                    />
                </div>
            </Card>
        </FontScope>
    );
};

export default TournamentCard;
