import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const unitTypeSuggestionSlice = fetchedSliceGenerator("unitType");

export const { unitTypeRequest, unitTypeInValidate,unitTypeRequestFail,unitTypeRequestSuccess,unitTypeRequestException } = unitTypeSuggestionSlice.actions;

export default unitTypeSuggestionSlice.reducer;

export const unitTypeSliceName = unitTypeSuggestionSlice.name;
let suggestionActions = unitTypeSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_UNIT_TYPE;

export const unitTypeThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(unitTypeSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};











import {createSlice} from "@reduxjs/toolkit";

const expenseTrackerSlice = createSlice({
    name:"expenseTracker",
    initialState:{
        expenseTrackers:{},
        invalidate:true
    },
    reducers:{
        setExpenseTrackers(state,action) {
            const {expenseTrackers} = action.payload;
            state.expenseTrackers = expenseTrackers;
            this.state.invalidate = false;
        },
        clearExpenseTrackers(state,action){
            state.expenseTrackers = {};
        },
        invalidateExpenseTrackers(state,action){
            const {invalidate} = action.payload;
            state.invalidate = invalidate;
        }
    }
});


export const { setExpenseTrackers,clearExpenseTrackers,invalidateExpenseTrackers} = expenseTrackerSlice.actions;
export default expenseTrackerSlice.reducer;