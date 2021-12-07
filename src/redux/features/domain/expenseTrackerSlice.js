import {createSlice} from "@reduxjs/toolkit";

const expenseTrackerSlice = createSlice({
    name:"expenseTracker",
    initialState:{
        expenseTrackers:{}
    },
    reducers:{
        setExpenseTrackers(state,action) {
            const {expenseTrackers} = action.payload;
            state.expenseTrackers = expenseTrackers;
        },
        clearExpenseTrackers(state,action){
            state.expenseTrackers = {};
        }
    }
});


export const { setExpenseTrackers,clearExpenseTrackers} = expenseTrackerSlice.actions;
export default expenseTrackerSlice.reducer;