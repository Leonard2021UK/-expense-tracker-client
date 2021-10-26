// import {setAuth0Token,setAuth0User} from '../actions/index'
import {combineReducers} from "@reduxjs/toolkit";

import registerFormSliceReducer from '../features/authentication/registerFormSlice';


export default combineReducers({
    registerForm:registerFormSliceReducer,
});



