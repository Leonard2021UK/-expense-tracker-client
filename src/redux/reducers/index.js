import {combineReducers} from "@reduxjs/toolkit";

import registerFormSliceReducer from '../features/authentication/registerFormSlice';
import expenseTrackerSliceReducer from "../features/domain/expenseTrackerSlice";
import appInitDataSliceReducer from "../features/utility/appInitDataSlice";
import expenseTrackerFormReducer from "../features/authentication/expenseTrackerForm";
import suggestionsReducer from '../features/suggestions/suggestionsSliceCombiner';


export default combineReducers({
    registerForm:registerFormSliceReducer,
    expenseTrackers:expenseTrackerSliceReducer,
    appInitDataSlice:appInitDataSliceReducer,
    suggestions:suggestionsReducer,
    expenseTrackerForm:expenseTrackerFormReducer
});



