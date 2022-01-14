import {createSlice} from "@reduxjs/toolkit";

const expenseFormSlice = createSlice({
    name:"expenseForm",
    initialState:{
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
    },
    reducers:{
        setExpenseFormState(state,action) {
            const {formState} = action.payload;
            console.log(formState)
            state = {
                id:formState.id,
                expenseAddress: formState.expenseAddress,
                expenseComment: formState.expenseComment,
                expenseEmail: formState.expenseEmail,
                expenseItems: [],
                expenseMobile: formState.expenseMobile,
                expenseName: formState.expenseName,
                expensePaymentType: formState.expensePaymentType,
                expensePhone: formState.expensePhone,
                expenseType: formState.expenseType,
                createdAt: formState.createdAt,
                createdBy: formState.createdBy
            }
            state = formState;
        },
        setExpenseName(state,action) {
            const {expenseName} = action.payload;
            state.expenseName = expenseName;
        },
        setExpenseEmail(state,action) {
            const {expenseEmail} = action.payload;
            state.expenseEmail = expenseEmail;
        },
        setExpensePhone(state,action) {
            const {expensePhone} = action.payload;
            state.expensePhone = expensePhone;
        },
        setExpenseMobile(state,action) {
            const {expenseMobile} = action.payload;
            state.expenseMobile = expenseMobile;
        },
        setExpenseAddress(state,action) {
            const {expenseAddress} = action.payload;
            state.expenseAddress = JSON.parse(expenseAddress);
        },
        setExpensePaymentType(state,action) {
            const {expensePaymentType} = action.payload;
            state.expensePaymentType = JSON.parse(expensePaymentType);
        },
        setExpenseType(state,action) {
            const {expenseType} = action.payload;
            state.expenseType = JSON.parse(expenseType);
        },
        setExpenseComment(state,action) {
            const {expenseComment} = action.payload;
            state.expenseComment = expenseComment;
        },
        setOwnerExpenseTracker(state,action) {
            const {expenseTracker} = action.payload;
            console.log("OWNER EXPENSE TRACKER IN EXPENSE FORMSLICE, ", expenseTracker)
            state.expenseTracker = expenseTracker;
        },
        clearExpenseForm(state,action){
            state = {
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
            state.expenseItems = tableState;
        },
        addRow(state,action){
            const {row,rowId} = action.payload;
            // minus one because the id already in the array
            state.expenseItems[rowId-1] = {...state.expenseItems[rowId-1],...row}
        },
        updateSelectedRow(state,action){
            const {rowId,fieldName,value} = action.payload;
            console.log(rowId,fieldName,value)
            state.expenseItems = state.expenseItems.map(row => row.id.rowId === rowId ? {...row,[fieldName]:value[0]}:row)
        },
        removeRow(state,action){
            const lastRow = state.expenseItems[state.expenseItems.length-1];
            state.expenseItems = state.expenseItems.filter(existingRow => existingRow !== lastRow);
        },
        setRowId(state,action) {
            const {rowId} = action.payload;
            const itemId = {};
            itemId.rowId = rowId;
           state.expenseItems[rowId] = {...state.expenseItems[rowId],id:itemId};
        },
        removeSelectedRow(state,action){
            //prevent delete the last line in the table
            if(state.expenseItems.length > 1){
                const {id} = action.payload;
                const selectedRow = state.expenseItems[id];
                state.expenseItems = state.expenseItems.filter(item => item !== selectedRow);
            }

        },
        clearItemTableState(state,action){
            state.expenseItems = [];
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