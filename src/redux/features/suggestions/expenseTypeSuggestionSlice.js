import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const expenseTypeSuggestionSlice = fetchedSliceGenerator("expenseType");

export const { expenseTypeRequest, expenseTypeInValidate,expenseTypeRequestFail,expenseTypeRequestSuccess,expenseTypeRequestException } = expenseTypeSuggestionSlice.actions;

export default expenseTypeSuggestionSlice.reducer;

export const expenseTypeSliceName = expenseTypeSuggestionSlice.name;
let suggestionActions = expenseTypeSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_EXPENSE_TYPE;

export const expenseTypeThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(expenseTypeSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};