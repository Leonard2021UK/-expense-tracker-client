import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const expensePaymentTypeSuggestionSlice = fetchedSliceGenerator("expensePaymentType");

export const { expensePaymentTypeRequest, expensePaymentTypeInValidate,expensePaymentTypeRequestFail,expensePaymentTypeRequestSuccess,expensePaymentTypeRequestException } = expensePaymentTypeSuggestionSlice.actions;

export default expensePaymentTypeSuggestionSlice.reducer;

export const expensePaymentTypeSliceName = expensePaymentTypeSuggestionSlice.name;
let suggestionActions = expensePaymentTypeSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_PAYMENT_TYPE;

export const expensePaymentTypeThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(expensePaymentTypeSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};