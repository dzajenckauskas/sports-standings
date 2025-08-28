import React from 'react'
import { ParticipantType } from '../utils/ParticipantType';
import { StandingsRowType } from '../utils/StandingsRowType';

type Props = {
    participants?: ParticipantType[];
    standings: StandingsRowType[]
}

const StandingsTable = ({ participants, standings }: Props) => {
    const hasData = Boolean(participants && participants.length > 0);

    return (
        <div>
            <h3>Standings</h3>

            <div
                style={{
                    maxHeight: 300,
                    overflowY: "auto",
                    paddingRight: 6,
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                }}
            >
                {hasData ? (
                    <table className="standings" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th className="th-left">Participant</th>
                                <th className="th-center">Games</th>
                                <th className="th-center">Wins</th>
                                <th className="th-center">Loses</th>
                                <th className="th-center">Draws</th>
                                <th className="th-center">Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((r, i) => (
                                <tr key={r.id} className="row">
                                    <td className="td-left">{r.name}</td>
                                    <td className="td">{r.games}</td>
                                    <td className="td">{r.wins}</td>
                                    <td className="td">{r.losses}</td>
                                    <td className="td">{r.draws}</td>
                                    <td className="td td-points">{r.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ fontSize: 14, padding: "8px 12px", color: "#6b7280" }}>
                        <i>No participants yet.</i>
                    </div>
                )}
            </div>

            <style>{`
        /* Sticky header to keep only body scrolling */
        .standings thead th {
          position: sticky;
          top: 0;
          z-index: 1;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Header cells */
        .th-left, .th-center {
          padding: 8px 12px;
          font-weight: 600;
          font-size: 13px;
          color: #374151;
          text-align: left;
        }
        .th-center { text-align: center; }

        /* Body cells */
        .td, .td-left {
          padding: 8px 12px;
          font-size: 14px;
          color: #111827;
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
        }
        .td-left { text-align: left; }
        .td { text-align: center; }

        /* Zebra stripes */
        .standings tbody .row:nth-child(odd) .td,
        .standings tbody .row:nth-child(odd) .td-left {
          background: #fafafa;
        }

        /* Points emphasis */
        .td-points {
          font-weight: 700;
          min-width: 56px;
        }

        /* Compact on small screens */
        @media (max-width: 400px) {
          .th-left, .th-center, .td, .td-left { padding: 6px 8px; font-size: 13px; }
        }
      `}</style>
        </div>
    )
}

export default StandingsTable