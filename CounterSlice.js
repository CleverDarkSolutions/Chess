import {createSlice} from '@reduxjs/toolkit';

export const CounterSlice = createSlice({
    name: 'counter',
    initialState: {
        values : [
            // id, background, pawn, colour, posX, posY
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