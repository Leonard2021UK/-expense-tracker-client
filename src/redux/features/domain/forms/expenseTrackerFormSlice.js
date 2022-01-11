import {createSlice} from "@reduxjs/toolkit";
import _ from 'lodash'
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
            const {mainCategoryName} = action.payload;

            state.formState.mainCategoryName = mainCategoryName;
        },
        setExpenseTrackerCategory(state,action) {

            const {mainCategory} = action.payload;
            state.formState.mainCategory = (_.isArray(mainCategory) ? mainCategory[0] : mainCategory);
        },
        clearExpenseTrackerForm(state,action){
            state.formState = {};
        }
    }
});


export const { setExpenseTrackerFormState,setExpenseTrackerName, setExpenseTrackerCategory,clearExpenseTrackerForm} = expenseTrackerFormSlice.actions;
export default expenseTrackerFormSlice.reducer;