import { useState } from 'react';
import { ParticipantType } from '../utils/ParticipantType';
import ParticipantForm from './forms/ParticipantForm';
import ScoreForm from './forms/ScoreForm';
import Card from './shared/Card';

type Props = {
    title: string;
    tournamentId: string;
}

const TournamentCard = ({ title, tournamentId }: Props) => {
    const [participants, setParticipants] = useState<ParticipantType[]>([])
    const handleAddParticipant = (name: string) => {
        const newParticipant = {
            id: name,
            name: name,
            tournamentId: tournamentId
        };
        setParticipants(prevParticipants => [newParticipant, ...prevParticipants]);
    };
    return (
        <div>
            <Card title={title}>
                {participants?.map((v) => {
                    return <div>
                        {v.name}
                    </div>
                })}
                <ParticipantForm
                    onAddParticipant={handleAddParticipant} />
                <ScoreForm />

            </Card>
        </div>
    )
}

export default TournamentCard
