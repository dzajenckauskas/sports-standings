import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchType } from '../types/MatchType';
import { makeId } from './makeId';

type ScoresState = MatchType[];

const initialState: ScoresState = [];

type AddMatchPayload = Omit<MatchType, 'id'> & { id?: string };

function pairKey(tournamentId: string, a: string, b: string) {
    // A–B equals B–A
    const [x, y] = [a, b].sort();
    return `${tournamentId}:${x}:${y}`;
}

const scoresSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {
        addMatch: (state, action: PayloadAction<AddMatchPayload>) => {
            const { tournamentId, homeParticipantId, awayParticipantId, homeParticipantScore, awayParticipantScore } = action.payload;

            if (homeParticipantId === awayParticipantId) return; //is invalid

            // prevent duplicates for the same pair within a tournament
            const key = pairKey(tournamentId, homeParticipantId, awayParticipantId);
            const exists = state.some(m => pairKey(m.tournamentId, m.homeParticipantId, m.awayParticipantId) === key);
            if (exists) return;

            state.push({
                id: action.payload.id ?? makeId(),
                tournamentId,
                homeParticipantId,
                awayParticipantId,
                homeParticipantScore,
                awayParticipantScore
            });
        },

        updateMatch: (state, action: PayloadAction<{ id: string; homeParticipantScore: number; awayParticipantScore: number }>) => {
            const m = state.find(x => x.id === action.payload.id);
            if (m) {
                m.homeParticipantScore = action.payload.homeParticipantScore;
                m.awayParticipantScore = action.payload.awayParticipantScore;
            }
        },

        removeMatch: (state, action: PayloadAction<string>) => {
            return state.filter(m => m.id !== action.payload);
        },
        removeMatchesByTournamentId: (state, action: PayloadAction<string>) => {
            return state.filter(m => m.tournamentId !== action.payload);
        },
    },
});

export const { addMatch, updateMatch, removeMatch, removeMatchesByTournamentId } = scoresSlice.actions;
export default scoresSlice.reducer;
