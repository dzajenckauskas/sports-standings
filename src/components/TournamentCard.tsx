import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import Card from './shared/Card';

type Props = {
    title: string;
}

const TournamentCard = ({ title }: Props) => {
    return (
        <div>
            <Card title={title}>
                <ParticipantForm />
                <ScoreForm />
            </Card>
        </div>
    )
}

export default TournamentCard
