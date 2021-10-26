import {createSlice} from "@reduxjs/toolkit";

const registerFormSlice = createSlice({
    name:"registerForm",
    initialState:{
        formState: {},
    },
    reducers:{
        setRegisterFormState(state,action) {
            const {formState} = action.payload;
            state.formState = formState;
        },
        setFirstName(state,action) {
            const {firstName} = action.payload;
            state.firstName = firstName;
        },
        setLastName(state,action) {
            const {lastName} = action.payload;
            state.lastName = lastName;
        },
        setEmail(state,action) {
            const {email} = action.payload;
            state.email = email;
        },
        setPassword(state,action){
            const {password} = action.payload;
            state.password = password;
        },
        setConfirmPassword(state,action){
            const {confirmPassword} = action.payload;
            state.confirmPassword = confirmPassword;
        },
        clearRegisterForm(state,action){
            state.formState = {};
        }
    }
});


export const { setRegisterFormState,setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, clearRegisterForm} = registerFormSlice.actions;
export default registerFormSlice.reducer;