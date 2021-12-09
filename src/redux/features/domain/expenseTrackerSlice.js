import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "expenseTrackers";
const expenseTrackerSuggestionSlice = fetchedSliceGenerator("expenseTrackers");

export const { expenseTrackerRequest, expenseTrackerInValidate,expenseTrackerRequestFail,expenseTrackerRequestSuccess,expenseTrackerRequestException } = expenseTrackerSuggestionSlice.actions;

export default expenseTrackerSuggestionSlice.reducer;

export const expenseTrackerSliceName = expenseTrackerSuggestionSlice.name;
let suggestionActions = expenseTrackerSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_EXPENSES_TRACKER;

export const expenseTrackerThunk = ()=> async (dispatch,getState) => {
    console.log("CALLING THUNK GENERATOR")

    const prevState = getState();
    await thunkGenerator(expenseTrackerSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);

};











// import {createSlice} from "@reduxjs/toolkit";
//
// const expenseTrackerSlice = createSlice({
//     name:"expenseTracker",
//     initialState:{
//         expenseTrackers:{},
//         invalidate:true
//     },
//     reducers:{
//         setExpenseTrackers(state,action) {
//             const {expenseTrackers} = action.payload;
//             state.expenseTrackers = expenseTrackers;
//             this.state.invalidate = false;
//         },
//         clearExpenseTrackers(state,action){
//             state.expenseTrackers = {};
//         },
//         invalidateExpenseTrackers(state,action){
//             const {invalidate} = action.payload;
//             state.invalidate = invalidate;
//         }
//     }
// });
//
//
// export const { setExpenseTrackers,clearExpenseTrackers,invalidateExpenseTrackers} = expenseTrackerSlice.actions;
// export default expenseTrackerSlice.reducer;