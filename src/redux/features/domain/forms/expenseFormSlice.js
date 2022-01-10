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
            const {expenseName} = action.payload;
            state.formState.expenseName = expenseName;
        },
        setExpenseEmail(state,action) {
            const {expenseEmail} = action.payload;
            state.formState.expenseEmail = expenseEmail;
        },
        setExpensePhone(state,action) {
            const {expensePhone} = action.payload;
            state.formState.expensePhone = expensePhone;
        },
        setExpenseMobile(state,action) {
            const {expenseMobile} = action.payload;
            state.formState.expenseMobile = expenseMobile;
        },
        setExpenseAddress(state,action) {
            const {expenseAddress} = action.payload;
            state.formState.expenseAddress = JSON.parse(expenseAddress);
        },
        setExpensePaymentType(state,action) {
            const {expensePaymentType} = action.payload;
            state.formState.expensePaymentType = JSON.parse(expensePaymentType);
        },
        setExpenseType(state,action) {
            const {expenseType} = action.payload;
            state.formState.expenseType = JSON.parse(expenseType);
        },
        setExpenseComment(state,action) {
            const {expenseComment} = action.payload;
            state.formState.expenseComment = expenseComment;
        },
        setOwnerExpenseTracker(state,action) {
            const {expenseTracker} = action.payload;
            console.log("OWNER EXPENSE TRACKER IN EXPENSE FORMSLICE, ", expenseTracker)
            state.formState.expenseTracker = expenseTracker;
        },
        clearExpenseForm(state,action){
            state.formState = {};
        }
    }
});


export const {setOwnerExpenseTracker,setExpenseFormState, setExpenseName, setExpenseEmail, setExpensePhone, setExpenseMobile, setExpenseAddress, setExpensePaymentType, setExpenseType, setExpenseComment, clearExpenseForm} = expenseFormSlice.actions;
export default expenseFormSlice.reducer;