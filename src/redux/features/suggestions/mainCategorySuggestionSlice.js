import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const mainCategorySuggestionSlice = fetchedSliceGenerator("mainCategory");

export const { mainCategoryRequest, mainCategoryInValidate,mainCategoryRequestFail,mainCategoryRequestSuccess,mainCategoryRequestException } = mainCategorySuggestionSlice.actions;

export default mainCategorySuggestionSlice.reducer;

export const mainCategorySliceName = mainCategorySuggestionSlice.name;
let suggestionActions = mainCategorySuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_MAIN_CATEGORY;

export const mainCategoryThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(mainCategorySliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};