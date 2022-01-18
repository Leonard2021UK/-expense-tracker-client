import {createSlice} from "@reduxjs/toolkit";

const expenseFormSlice = createSlice({
    name:"expenseForm",
    initialState:
        {
            formState:{
                id:"",
                expenseAddress: null,
                expenseComment: null,
                expenseEmail: null,
                expenseItems: [],
                expenseMobile: null,
                expenseName: "",
                expensePaymentType: null,
                expensePhone: null,
                expenseTracker: null,
                expenseType: null,
                createdAt: null,
                createdBy: null,
            }
        },
    reducers:{
        setExpenseFormState(state,action) {
            const {formState} = action.payload;
            state.formState = {...formState};
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
            state.formState = {
                id:"",
                expenseAddress: null,
                expenseComment: null,
                expenseEmail: null,
                expenseItems: [],
                expenseMobile: null,
                expenseName: "",
                expensePaymentType: null,
                expensePhone: null,
                expenseTracker: null,
                expenseType: null
            };
        },
        //***************************************************************
        setItemTableState(state,action) {
            const {tableState} = action.payload;
            state.formState.expenseItems = [...tableState];
        },
        addRow(state,action){
            const {row,rowId} = action.payload;
            // minus one because the id already in the array
            state.formState.expenseItems[rowId-1] = {...state.formState.expenseItems[rowId-1],...row}
        },
        updateSelectedRow(state,action){
            const {rowId,fieldName,value} = action.payload;
            console.log(rowId,fieldName,value)
            state.formState.expenseItems = state.formState.expenseItems.map(row => row.id.rowId === rowId ? {...row,[fieldName]:value[0]}:row)
        },
        removeRow(state,action){
            const lastRow = state.formState.expenseItems[state.formState.expenseItems.length-1];
            state.formState.expenseItems = state.formState.expenseItems.filter(existingRow => existingRow !== lastRow);
        },
        setRowId(state,action) {
            const {rowId} = action.payload;
            const itemId = {};
            itemId.rowId = rowId;
           state.formState.expenseItems[rowId] = {...state.formState.expenseItems[rowId],id:itemId};
        },
        removeSelectedRow(state,action){
            //prevent delete the last line in the table
            if(state.formState.expenseItems.length > 1){
                const {id} = action.payload;
                const selectedRow = state.formState.expenseItems[id];
                state.formState.expenseItems = state.formState.expenseItems.filter(item => item !== selectedRow);
            }

        },
        clearItemTableState(state,action){
            state.formState.expenseItems = [];
        }
    }
});


export const {
    setItemTableState,
    setRowId,
    addRow,
    updateSelectedRow,
    removeRow,
    removeSelectedRow,
    clearItemTableState,
    setOwnerExpenseTracker,
    setExpenseFormState,
    setExpenseName,
    setExpenseEmail,
    setExpensePhone,
    setExpenseMobile,
    setExpenseAddress,
    setExpensePaymentType,
    setExpenseType,
    setExpenseComment,
    clearExpenseForm
} = expenseFormSlice.actions;
export default expenseFormSlice.reducer;


// initialState:{
//     createdAt: null,
//         createdBy: null,
//         expenseAddress: null,
//         expenseComment: null,
//         expenseEmail: null,
//         expenseItems: [],
//         expenseMobile: null,
//         expenseName: "",
//         expensePaymentType: null,
//         expensePhone: null,
//         expenseTracker: null,
//         expenseType: null
// },