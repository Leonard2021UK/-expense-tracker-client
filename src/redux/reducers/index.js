import {combineReducers} from "@reduxjs/toolkit";

import registerFormSliceReducer from '../features/authentication/registerFormSlice';
import expenseTrackerSliceReducer from "../features/domain/expenseTrackerSlice";

export default combineReducers({
    registerForm:registerFormSliceReducer,
    expenseTrackers:expenseTrackerSliceReducer
});



