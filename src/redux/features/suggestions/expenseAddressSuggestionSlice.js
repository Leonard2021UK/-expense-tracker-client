import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const expenseAddressSuggestionSlice = fetchedSliceGenerator("expenseAddress");

export const { expenseAddressRequest, expenseAddressInValidate,expenseAddressRequestFail,expenseAddressRequestSuccess,expenseAddressRequestException } = expenseAddressSuggestionSlice.actions;

export default expenseAddressSuggestionSlice.reducer;

export const expenseAddressSliceName = expenseAddressSuggestionSlice.name;
let suggestionActions = expenseAddressSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_EXPENSE_ADDRESS;

export const expenseAddressThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(expenseAddressSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};