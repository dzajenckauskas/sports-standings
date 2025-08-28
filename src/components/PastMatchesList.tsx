import { MatchType } from '../utils/MatchType';

type Props = {
    getParticipantName: (id: string) => string | undefined;
    matches?: MatchType[]
}

const PastMatchesList = ({ getParticipantName, matches }: Props) => {
    return (
        <div>
            <h3>Past matches</h3>
            {(matches && matches?.length > 0) ? (
                <>
                    {matches.map((m) => (
                        <div key={m.id} style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div>{getParticipantName(m.homeParticipantId)}</div>
                                <div>{'vs'}</div>
                                <div>{getParticipantName(m.awayParticipantId)}</div>
                            </div>
                            <div style={{ display: 'flex', width: 'min-content', fontWeight: 700, justifyContent: 'space-between' }}>
                                <div>{m.homeParticipantScore}</div>
                                <div>{'-'}</div>
                                <div>{m.awayParticipantScore}</div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div style={{ fontSize: 14, padding: "4px 0px" }}>
                    <i>No matches yet.</i>
                </div>
            )}
        </div>
    )
}

export default PastMatchesList
