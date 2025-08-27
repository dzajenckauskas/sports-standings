import { ParticipantType } from "./ParticipantType";

export type TournamentType = {
    id: string;
    title: string;
    drawAllowed: boolean;
    participants: ParticipantType[];
}