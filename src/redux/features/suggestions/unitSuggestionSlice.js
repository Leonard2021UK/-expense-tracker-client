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