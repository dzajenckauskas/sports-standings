import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StandingsRowType } from '../utils/StandingsRowType';
import PastMatchesList from './PastMatchesList';
import StandingsTable from './StandingsTable';
import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import { Button } from './shared/Button';
import Card from './shared/Card';
import { PlusIcon } from './shared/icons/PlusIcon';

type Props = {
    title: string;
    tournamentId: string;
    showFormToggleButtons?: boolean;
};

const TournamentCard = ({ title, tournamentId, showFormToggleButtons }: Props) => {
    const [showParticipantForm, setShowParticipantForm] = useState(!showFormToggleButtons)
    const [showScoreForm, setShowScoreForm] = useState(!showFormToggleButtons)

    const toggleParticipantForm = () => {
        setShowParticipantForm(!showParticipantForm)
    }
    const toggleScoreForm = () => {
        setShowScoreForm(!showScoreForm)
    }
    const participants = useSelector((state: RootState) =>
        state.participants.filter((p) => p.tournamentId === tournamentId)
    );

    const matches = useSelector((state: RootState) =>
        state.scores?.filter((m) => m.tournamentId === tournamentId) ?? []
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
            if (!home || !away) continue; // ignore matches with participants not in this list

            home.games += 1;
            away.games += 1;

            // Scoring system:
            // - Win: 3 pts
            // - Draw: 1 pt
            // - Loss: 0 pts

            if (m.homeParticipantScore > m.awayParticipantScore) {
                home.wins += 1; home.points += 3;
                away.losses += 1;
            } else if (m.homeParticipantScore < m.awayParticipantScore) {
                away.wins += 1; away.points += 3;
                home.losses += 1;
            } else {
                home.draws += 1; home.points += 1;
                away.draws += 1; away.points += 1;
            }
        }

        // sort: points desc, wins desc, name asc
        return Object.values(base).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.wins !== a.wins) return b.wins - a.wins;
            return a.name.localeCompare(b.name);
        });
    }, [participants, matches]);

    const getParticipantName = (id: string) => {
        return participants?.find((p) => p.id === id)?.name
    }

    return (

        <Card
            title={title}
        >
            {showFormToggleButtons &&
                <div style={{
                    display: 'flex', width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        variant='secondary'
                        size='sm'
                        active={showParticipantForm}
                        onClick={toggleParticipantForm}
                        startIcon={<PlusIcon size={16} />}>
                        {'Add Participant'}
                    </Button>
                    <Button
                        variant='secondary'
                        size='sm' disabled={participants?.length === 0} active={showScoreForm}
                        onClick={toggleScoreForm}
                        startIcon={<PlusIcon size={16} />}>
                        {'Add Score'}
                    </Button>
                </div>}
            {showParticipantForm &&
                <ParticipantForm participants={participants}
                    tournamentId={tournamentId} />}
            {showScoreForm &&
                <ScoreForm disabled={participants?.length === 0}
                    participants={participants} tournamentId={tournamentId} />}

            <PastMatchesList
                matches={matches}
                getParticipantName={getParticipantName}
            />

            <StandingsTable
                participants={participants}
                standings={standings}
            />
        </Card>
    );
};

export default TournamentCard;
