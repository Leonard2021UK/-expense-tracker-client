import fetchedSliceGenerator from "../../fetchedSliceGenerator";
import thunkGenerator from "../../thunkGenerator";

const rootTreeName = "suggestions";
const itemSuggestionSlice = fetchedSliceGenerator("item");

export const { itemRequest, itemsInValidate,itemRequestFail,itemRequestSuccess,itemRequestException } = itemSuggestionSlice.actions;

export default itemSuggestionSlice.reducer;

export const itemSliceName = itemSuggestionSlice.name;
let suggestionActions = itemSuggestionSlice.actions;
let fetchUrl = process.env.REACT_APP_ITEM;

export const itemThunk = ()=> async (dispatch,getState) => {
    console.log("CALLING THUNK GENERATOR")

    const prevState = getState();
    await thunkGenerator(itemSliceName,suggestionActions,dispatch,prevState,rootTreeName,fetchUrl);

};
