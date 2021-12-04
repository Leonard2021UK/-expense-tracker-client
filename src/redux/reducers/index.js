import {combineReducers} from "@reduxjs/toolkit";

import registerFormSliceReducer from '../features/authentication/registerFormSlice';
import expenseTrackerSliceReducer from "../features/authentication/expenseTrackerSlice";

export default combineReducers({
    registerForm:registerFormSliceReducer,
    expenseTrackerList:expenseTrackerSliceReducer
});



