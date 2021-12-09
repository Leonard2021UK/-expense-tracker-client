import {combineReducers} from "@reduxjs/toolkit";
import unitTypeReducer from '../suggestions/unitSuggestionSlice';


//Reducer object key name is the name passed to fetchedSliceGenerator
export default combineReducers({
    unitType:unitTypeReducer,
});



