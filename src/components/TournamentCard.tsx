import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useI18n } from "../i18n/i18n";
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

type Props = {
    tournamentId: string;
    showFormToggleButtons?: boolean;
    titleIcon?: React.ReactNode;
    /** The i18n namespace for this card (e.g., "clean-minimal", "sporty-energetic") */
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
}: Props) => {
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

    const { t, loadNamespace, /* if available: */  /* and locale if needed */ locale } =
        useI18n() as any;

    // --- Preload the card's namespace (and ensure "common" exists) to avoid flicker
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let mounted = true;
        (async () => {
            await Promise.all([
                loadNamespace("common"),
                namespace ? loadNamespace(namespace) : Promise.resolve(),
            ]);
            if (mounted) setReady(true);
        })();
        return () => {
            mounted = false;
        };
        // include namespace/locale if you want to reload on change
    }, [namespace, locale, loadNamespace]);

    if (!ready) {
        // Minimal skeleton; replace with your real shimmer/skeleton if you have one
        return (
            <FontScope>
                <Card title=" " icon={titleIcon}>
                    <div style={{ height: 120 }} />
                </Card>
            </FontScope>
        );
    }

    // Prefer namespaced keys for card-specific strings;
    // generic action keys can stay in "common"
    return (
        <FontScope>
            <Card title={t(`${namespace}.singularTitle`)} icon={titleIcon}>
                {showFormToggleButtons && (
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <Button
                            variant="secondary"
                            size="sm"
                            active={showParticipantForm}
                            onClick={toggleParticipantForm}
                            startIcon={<PlusIcon size={20} />}
                        >
                            {t(`${namespace}.actions.addParticipant`) || t("actions.addParticipant")}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={participants?.length === 0}
                            active={showScoreForm}
                            onClick={toggleScoreForm}
                            startIcon={<PlusIcon size={20} />}
                        >
                            {t(`${namespace}.actions.addScore`) || t("actions.addScore")}
                        </Button>
                    </div>
                )}

                {showParticipantForm && (
                    <ParticipantForm participants={participants} tournamentId={tournamentId} />
                )}

                {showScoreForm && (
                    <ScoreForm
                        disabled={participants?.length === 0}
                        participants={participants}
                        tournamentId={tournamentId}
                    />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 24 }}>
                    <PastMatchesList matches={matches} getParticipantName={getParticipantName} />
                    <StandingsTable participants={participants} standings={standings} />
                </div>
            </Card>
        </FontScope>
    );
};

export default TournamentCard;
