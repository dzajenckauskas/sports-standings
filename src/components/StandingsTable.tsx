import React from 'react'
import { ParticipantType } from '../utils/ParticipantType';
import { StandingsRowType } from '../utils/StandingsRowType';

type Props = {
    participants?: ParticipantType[];
    standings: StandingsRowType[]
}

const StandingsTable = ({ participants, standings }: Props) => {
    return (
        <div>
            <h3>Standings</h3>
            {(participants && participants?.length > 0) ? (
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
                <div style={{ fontSize: 14, padding: "4px 0px" }}>
                    <i>No participants yet.</i>
                </div>
            )}
        </div>
    )
}

export default StandingsTable
