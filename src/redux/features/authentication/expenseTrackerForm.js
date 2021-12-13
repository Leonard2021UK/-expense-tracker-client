import {createSlice} from "@reduxjs/toolkit";

const expenseTrackerFormSlice = createSlice({
    name:"expenseTrackerForm",
    initialState:{
        formState: {},
    },
    reducers:{
        setExpenseTrackerFormState(state,action) {
            const {formState} = action.payload;
            state.formState = formState;
        },
        setExpenseTrackerName(state,action) {
            const {name} = action.payload;
            state.formState.firstName = firstName;
        },
        setExpenseTrackerCategory(state,action) {
            const {category} = action.payload;
            state.formState.lastName = lastName;
        },
        clearExpenseTrackerForm(state,action){
            state.formState = {};
        }
    }
});


export const { setExpenseTrackerFormState,setExpenseTrackerName, setExpenseTrackerCategory,clearExpenseTrackerForm} = expenseTrackerFormSlice.actions;
export default expenseTrackerFormSlice.reducer;