import {combineReducers} from "@reduxjs/toolkit";

import registerFormSliceReducer from '../features/authentication/registerFormSlice';
import expenseTrackerSliceReducer from "../features/domain/expenseTrackerSlice";
import appInitDataSliceReducer from "../features/utility/appInitDataSlice";
import expenseTrackerFormReducer from "../features/domain/forms/expenseTrackerFormSlice";
import itemFormReducer from "../features/domain/forms/itemFormSlice";
import itemsTableReducer from "../features/domain/tables/itemsTableSlice";
import expenseFormReducer from "../features/domain/forms/expenseFormSlice";
import suggestionsReducer from '../features/suggestions/suggestionsSliceCombiner';

export default combineReducers({
    registerForm:registerFormSliceReducer,
    expenseTrackers:expenseTrackerSliceReducer,
    appInitDataSlice:appInitDataSliceReducer,
    suggestions:suggestionsReducer,
    expenseTrackerForm:expenseTrackerFormReducer,
    itemForm:itemFormReducer,
    itemsTable:itemsTableReducer,
    expenseForm:expenseFormReducer
});



