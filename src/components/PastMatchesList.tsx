import { MatchType } from "../utils/MatchType";

type Props = {
    getParticipantName: (id: string) => string | undefined;
    matches?: MatchType[];
};

const PastMatchesList = ({ getParticipantName, matches }: Props) => {
    return (
        <div>
            <h3>Past matches</h3>
            <div
                style={{
                    maxHeight: 300,
                    flex: 1,
                    overflowY: "auto",
                    // paddingRight: 6,
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                }}
            >
                {matches && matches.length > 0 ? (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {matches.map((m, i) => (
                            <li
                                key={m.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 12px",
                                    background: i % 2 === 0 ? "#fafafa" : "#fff",
                                    borderBottom:
                                        i === matches.length - 1 ? "none" : "1px solid #e5e7eb",
                                }}
                            >
                                <div style={{ display: "flex", gap: 8, fontSize: 14 }}>
                                    <span style={{ fontWeight: 500 }}>
                                        {getParticipantName(m.homeParticipantId)}
                                    </span>
                                    <span style={{ color: "#6b7280" }}>vs</span>
                                    <span style={{ fontWeight: 500 }}>
                                        {getParticipantName(m.awayParticipantId)}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        minWidth: 50,
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 4,
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                >
                                    <span>{m.homeParticipantScore}</span>
                                    <span>-</span>
                                    <span>{m.awayParticipantScore}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{ fontSize: 14, padding: "8px 12px", color: "#6b7280" }}>
                        <i>No matches yet.</i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PastMatchesList;