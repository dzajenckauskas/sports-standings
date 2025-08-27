import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import Card from './shared/Card';

type Props = {
    title: string;
    tournamentId: string;
};

type StandingsRow = {
    id: string;
    name: string;
    games: number;
    wins: number;
    losses: number;
    draws: number;
    points: number;
};

const TournamentCard = ({ title, tournamentId }: Props) => {
    const participants = useSelector((state: RootState) =>
        state.participants.filter((p) => p.tournamentId === tournamentId)
    );

    const matches = useSelector((state: RootState) =>
        state.scores?.filter((m) => m.tournamentId === tournamentId) ?? []
    );

    const standings: StandingsRow[] = useMemo(() => {
        const base: Record<string, StandingsRow> = {};
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

            // Scoring system:
            // - Win: 3 pts
            // - Draw: 1 pt
            // - Loss: 0 pts

            home.games += 1;
            away.games += 1;

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

    return (
        <div>
            <Card title={title}>
                <ParticipantForm participants={participants} tournamentId={tournamentId} />
                <ScoreForm participants={participants} tournamentId={tournamentId} />

                {participants.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Games</th>
                                <th>Wins</th>
                                <th>Loses</th>
                                <th>Draws</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.name}</td>
                                    <td>{r.games}</td>
                                    <td>{r.wins}</td>
                                    <td>{r.losses}</td>
                                    <td>{r.draws}</td>
                                    <td>{r.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No participants yet.</p>
                )}
            </Card>
        </div>
    );
};

export default TournamentCard;
