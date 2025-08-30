import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParticipantType } from '../types/ParticipantType';

const initialState: ParticipantType[] = [];

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        addParticipant: (state, action: PayloadAction<ParticipantType>) => {
            const exists = state.some(
                (p) =>
                    p.name.trim().toLowerCase() === action.payload.name.trim().toLowerCase() &&
                    p.tournamentId === action.payload.tournamentId
            );

            if (!exists) {
                state.push(action.payload);
            }
        },
    },
});

export const { addParticipant } = participantsSlice.actions;
export default participantsSlice.reducer;
