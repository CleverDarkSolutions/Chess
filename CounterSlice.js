import {createSlice} from '@reduxjs/toolkit';

export const CounterSlice = createSlice({
    name: 'counter',
    initialState: {
        values : [
            { id: 0, background: "white", pawn: "rook", colour: "black", posX: 1, posY: 8 },
            { id: 1, background: "black", pawn: "knight", colour: "black", posX: 2, posY: 8 },
            { id: 2, background: "white", pawn: "bishop", colour: "black", posX: 3, posY: 8 },
            { id: 3, background: "black", pawn: "queen", colour: "black", posX: 4, posY: 8 },
            { id: 4, background: "white", pawn: "king", colour: "black", posX: 5, posY: 8 },
            { id: 5, background: "black", pawn: "bishop", colour: "black", posX: 6, posY: 8 },
            { id: 6, background: "white", pawn: "knight", colour: "black", posX: 7, posY: 8 },
            { id: 7, background: "black", pawn: "rook", colour: "black", posX: 8, posY: 8 },
            { id: 8, background: "black", pawn: "pawn", colour: "black", posX: 1, posY: 7 },
            { id: 9, background: "white", pawn: "pawn", colour: "black", posX: 2, posY: 7 },
            { id: 10, background: "black", pawn: "pawn", colour: "black", posX: 3, posY: 7 },
            { id: 11, background: "white", pawn: "pawn", colour: "black", posX: 4, posY: 7 },
            { id: 12, background: "black", pawn: "pawn", colour: "black", posX: 5, posY: 7 },
            { id: 13, background: "white", pawn: "pawn", colour: "black", posX: 6, posY: 7 },
            { id: 14, background: "white", pawn: "pawn", colour: "black", posX: 7, posY: 7 },
            { id: 15, background: "black", pawn: "pawn", colour: "black", posX: 8, posY: 7 },
        ],
        i: 0
    },
    reducers: {
        addField: (state, action) => {
            const i = action.payload;
            state.values[i.id] = i;
        }
    }
});

export const {addField} = CounterSlice.actions;
export default CounterSlice.reducer;