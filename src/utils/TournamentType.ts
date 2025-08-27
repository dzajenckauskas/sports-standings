import { MatchType } from "./MatchType";
import { ParticipantType } from "./ParticipantType";

export type TournamentType = {
    id: string;
    title: string;
    drawAllowed: boolean;
    // type: "national" | "individual" | "club";
    participants: ParticipantType[];
    pastMatches: MatchType[];
}