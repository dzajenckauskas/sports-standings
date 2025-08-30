export type ParticipantType = {
    id: string;
    name: string;
    tournamentId: string;
}

export type ParticipantInputType = "text" | "select" | "emoji"

export type ParticipantOptionType = {
    name: string;
    flag?: string;
    icon?: string;
    code?: string;
}