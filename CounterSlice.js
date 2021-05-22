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
            { id: 14, background: "black", pawn: "pawn", colour: "black", posX: 7, posY: 7 },
            { id: 15, background: "white", pawn: "pawn", colour: "black", posX: 8, posY: 7 },

            { id: 16, background: "white", pawn: "", colour: "", posX: 1, posY: 6 },
            { id: 17, background: "black", pawn: "", colour: "", posX: 2, posY: 6 },
            { id: 18, background: "white", pawn: "", colour: "", posX: 3, posY: 6 },
            { id: 19, background: "black", pawn: "", colour: "", posX: 4, posY: 6 },
            { id: 20, background: "white", pawn: "", colour: "", posX: 5, posY: 6 },
            { id: 21, background: "black", pawn: "", colour: "", posX: 6, posY: 6 },
            { id: 22, background: "white", pawn: "", colour: "", posX: 7, posY: 6 },
            { id: 23, background: "black", pawn: "", colour: "", posX: 8, posY: 6 },

            { id: 24, background: "black", pawn: "", colour: "", posX: 1, posY: 5 },
            { id: 25, background: "white", pawn: "", colour: "", posX: 2, posY: 5 },
            { id: 26, background: "black", pawn: "", colour: "", posX: 3, posY: 5 },
            { id: 27, background: "white", pawn: "", colour: "", posX: 4, posY: 5 },
            { id: 28, background: "black", pawn: "", colour: "", posX: 5, posY: 5 },
            { id: 29, background: "white", pawn: "", colour: "", posX: 6, posY: 5 },
            { id: 30, background: "black", pawn: "", colour: "", posX: 7, posY: 5 },
            { id: 31, background: "white", pawn: "", colour: "", posX: 8, posY: 5 },

            { id: 32, background: "white", pawn: "", colour: "", posX: 1, posY: 4 },
            { id: 33, background: "black", pawn: "", colour: "", posX: 2, posY: 4 },
            { id: 34, background: "white", pawn: "", colour: "", posX: 3, posY: 4 },
            { id: 35, background: "black", pawn: "", colour: "", posX: 4, posY: 4 },
            { id: 36, background: "white", pawn: "", colour: "", posX: 5, posY: 4 },
            { id: 37, background: "black", pawn: "", colour: "", posX: 6, posY: 4 },
            { id: 38, background: "white", pawn: "", colour: "", posX: 7, posY: 4 },
            { id: 39, background: "black", pawn: "", colour: "", posX: 8, posY: 4 },

            { id: 40, background: "black", pawn: "", colour: "", posX: 1, posY: 3 },
            { id: 41, background: "white", pawn: "", colour: "", posX: 2, posY: 3 },
            { id: 42, background: "black", pawn: "", colour: "", posX: 3, posY: 3 },
            { id: 43, background: "white", pawn: "", colour: "", posX: 4, posY: 3 },
            { id: 44, background: "black", pawn: "", colour: "", posX: 5, posY: 3 },
            { id: 45, background: "white", pawn: "", colour: "", posX: 6, posY: 3 },
            { id: 46, background: "black", pawn: "", colour: "", posX: 7, posY: 3 },
            { id: 47, background: "white", pawn: "", colour: "", posX: 8, posY: 3 },

            { id: 48, background: "white", pawn: "pawn", colour: "white", posX: 1, posY: 2 },
            { id: 49, background: "black", pawn: "pawn", colour: "white", posX: 2, posY: 2 },
            { id: 50, background: "white", pawn: "pawn", colour: "white", posX: 3, posY: 2 },
            { id: 51, background: "black", pawn: "pawn", colour: "white", posX: 4, posY: 2 },
            { id: 52, background: "white", pawn: "pawn", colour: "white", posX: 5, posY: 2 },
            { id: 53, background: "black", pawn: "pawn", colour: "white", posX: 6, posY: 2 },
            { id: 54, background: "white", pawn: "pawn", colour: "white", posX: 7, posY: 2 },
            { id: 55, background: "black", pawn: "pawn", colour: "white", posX: 8, posY: 2 },

            { id: 56, background: "black", pawn: "rook", colour: "white", posX: 1, posY: 1 },
            { id: 57, background: "white", pawn: "knight", colour: "white", posX: 2, posY: 1 },
            { id: 58, background: "black", pawn: "bishop", colour: "white", posX: 3, posY: 1 },
            { id: 59, background: "white", pawn: "queen", colour: "white", posX: 4, posY: 1 },
            { id: 60, background: "black", pawn: "king", colour: "white", posX: 5, posY: 1 },
            { id: 61, background: "white", pawn: "bishop", colour: "white", posX: 6, posY: 1 },
            { id: 62, background: "black", pawn: "knight", colour: "white", posX: 7, posY: 1 },
            { id: 63, background: "white", pawn: "rook", colour: "white", posX: 8, posY: 1 },

            
        ],
        i: 0,
        globalMoves : []
    },
    reducers: {
        addField: (state, action) => {
            const i = action.payload;
            state.values[i.id] = i;
        },
        addMoves: (state, action) => {
            const i = action.payload;
            state.globalMoves = state.globalMoves.concat(i);
        }
    }
});

export const {addField,addMoves} = CounterSlice.actions;
export default CounterSlice.reducer;