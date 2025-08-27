import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import Card from './shared/Card';

type Props = {
    title: string;
    tournamentId: string;
};

const TournamentCard = ({ title, tournamentId }: Props) => {
    const participants = useSelector((state: RootState) =>
        state.participants.filter((p) => p.tournamentId === tournamentId)
    );

    return (
        <div>
            <Card title={title}>
                <ParticipantForm participants={participants} tournamentId={tournamentId} />
                <ScoreForm />

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
                            {participants.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.name}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
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
