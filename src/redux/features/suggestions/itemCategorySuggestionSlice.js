import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const itemCategorySuggestionSlice = fetchedSliceGenerator("itemCategory");

export const { itemCategoryRequest, itemCategoryInValidate,itemCategoryRequestFail,itemCategoryRequestSuccess,itemCategoryRequestException } = itemCategorySuggestionSlice.actions;

export default itemCategorySuggestionSlice.reducer;

export const itemCategorySliceName = itemCategorySuggestionSlice.name;
let suggestionActions = itemCategorySuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_ITEM_CATEGORY;

export const itemCategoryThunk = ()=> async (dispatch,getState) => {
    const prevState = getState();
    await thunkGenerator(itemCategorySliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);
};