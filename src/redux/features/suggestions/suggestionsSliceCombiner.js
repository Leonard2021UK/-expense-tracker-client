import {combineReducers} from "@reduxjs/toolkit";
import unitTypeReducer from '../suggestions/unitSuggestionSlice';
import mainCategoryReducer from '../suggestions/mainCategorySuggestionSlice'
import itemCategoryReducer from '../suggestions/itemCategorySuggestionSlice';
import itemReducer from '../suggestions/itemSuggestionSlice'
//Reducer object key name is the name passed to fetchedSliceGenerator
export default combineReducers({
    unitType:unitTypeReducer,
    mainCategory:mainCategoryReducer,
    itemCategory:itemCategoryReducer,
    item:itemReducer
});



