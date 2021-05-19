import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        values : [
            { id: 1, colour : '', pawn : '', takeable: '', },
        ],
        i: 0
    },
    reducers: {
        addField: (state, action) => {
            state.values = state.values.append(action.payload);
        }
    }
});

export const {addField} = counterSlice.actions;
export default counterSlice.reducer;