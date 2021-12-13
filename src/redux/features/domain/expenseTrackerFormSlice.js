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
            console.log(action.payload.data)
            const {mainCategoryName} = action.payload;
            console.log(action.payload.data)

            state.formState.mainCategoryName = mainCategoryName;
        },
        setExpenseTrackerCategory(state,action) {
            console.log(action)

            const {mainCategory} = action.payload;
            state.formState.mainCategory = mainCategory;
        },
        clearExpenseTrackerForm(state,action){
            state.formState = {};
        }
    }
});


export const { setExpenseTrackerFormState,setExpenseTrackerName, setExpenseTrackerCategory,clearExpenseTrackerForm} = expenseTrackerFormSlice.actions;
export default expenseTrackerFormSlice.reducer;