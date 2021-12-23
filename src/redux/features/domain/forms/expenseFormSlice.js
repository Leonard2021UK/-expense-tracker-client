import {createSlice} from "@reduxjs/toolkit";

const expenseFormSlice = createSlice({
    name:"expenseForm",
    initialState:{
        formState: {},
    },
    reducers:{
        setExpenseFormState(state,action) {
            const {formState} = action.payload;
            state.formState = formState;
        },
        setExpenseName(state,action) {
            const {name} = action.payload;
            state.formState.name = name;
        },
        setExpenseEmail(state,action) {
            const {email} = action.payload;
            state.formState.email = email;
        },
        setPhone(state,action) {
            const {phone} = action.payload;
            state.formState.phone = phone;
        },
        setMobile(state,action) {
            const {mobile} = action.payload;
            state.formState.mobile = mobile;
        },
        setAddress(state,action) {
            const {address} = action.payload;
            state.formState.address = address;
        },
        setPaymentType(state,action) {
            const {paymentType} = action.payload;
            state.formState.paymentType = paymentType;
        },
        setExpenseType(state,action) {
            const {expenseType} = action.payload;
            state.formState.expenseType = expenseType;
        },
        setComment(state,action) {
            const {comment} = action.payload;
            state.formState.comment = comment;
        },
        clearExpenseForm(state,action){
            state.formState = {};
        }
    }
});


export const {setExpenseFormState, setExpenseName, setExpenseEmail, setPhone, setMobile, setAddress, setPaymentType, setExpenseType, setComment, clearExpenseForm} = expenseFormSlice.actions;
export default expenseFormSlice.reducer;