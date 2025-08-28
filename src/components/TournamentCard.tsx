import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import Card from './shared/Card';
import { Button } from './shared/Button';

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
    const [showParticipantForm, setShowParticipantForm] = useState(false)
    const [showScoreForm, setShowScoreForm] = useState(false)

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
    console.log(matches, "matches");
    console.log(participants, "participants");

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
    const getParticipantName = (id: string) => {
        return participants?.find((p) => p.id === id)?.name
    }
    return (
        <div style={{ padding: 20 }}>
            <Card title={title}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Button onClick={toggleParticipantForm}>+ Add Participant</Button>
                    <Button onClick={toggleScoreForm}>+ Add Scrore</Button>
                </div>
                {showParticipantForm &&
                    <ParticipantForm participants={participants} tournamentId={tournamentId} />}
                {showScoreForm &&
                    <ScoreForm participants={participants} tournamentId={tournamentId} />}

                {matches?.length > 0 ? (
                    <>
                        <h3>Past matches</h3>
                        {matches.map((m) => (
                            <div key={m.id} style={{
                                display: 'flex', width: '100%', justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', gap: 20 }}>
                                    <div>{getParticipantName(m.homeParticipantId)}</div>
                                    <div>{'vs'}</div>
                                    <div>{getParticipantName(m.awayParticipantId)}</div>
                                </div>
                                <div style={{ display: 'flex', gap: 10, fontWeight: 700 }}>
                                    <div>{m.homeParticipantScore}</div>
                                    <div>{'-'}</div>
                                    <div>{m.awayParticipantScore}</div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No matches yet.</p>
                )}

                {participants.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Participant</th>
                                <th style={{ textAlign: 'center' }}>Games</th>
                                <th style={{ textAlign: 'center' }}>Wins</th>
                                <th style={{ textAlign: 'center' }}>Loses</th>
                                <th style={{ textAlign: 'center' }}>Draws</th>
                                <th style={{ textAlign: 'center' }}>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((r) => (
                                <tr key={r.id}>
                                    <td style={{ textAlign: 'left' }}>{r.name}</td>
                                    <td style={{ textAlign: 'center' }}>{r.games}</td>
                                    <td style={{ textAlign: 'center' }}>{r.wins}</td>
                                    <td style={{ textAlign: 'center' }}>{r.losses}</td>
                                    <td style={{ textAlign: 'center' }}>{r.draws}</td>
                                    <td style={{ textAlign: 'center' }}>{r.points}</td>
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
