import {createSlice} from "@reduxjs/toolkit";

const itemFormSlice = createSlice({
    name:"itemForm",
    initialState:{
        formState: {},
    },
    reducers:{
        setItemFormState(state,action) {
            const {formState} = action.payload;
            state.formState = formState;
        },
        setItemName(state,action) {
            const {itemName} = action.payload;
            state.formState.itemName = itemName;
        },
        setItemCategory(state,action) {
            const {itemCategory} = action.payload;
            state.formState.itemCategory = itemCategory;
        },
        setAmount(state,action) {
            const {amount} = action.payload;
            state.formState.amount = amount;
        },
        setUnitPrice(state,action) {
            const {unitPrice} = action.payload;
            state.formState.unitPrice = unitPrice;
        },
        setUnit(state,action) {
            const {unit} = action.payload;
            state.formState.unit = unit;
        },
        clearItemForm(state,action){
            state.formState = {};
        }
    }
});


export const { setItemFormState,setUnit,setItemName,setUnitPrice,setAmount,setItemCategory,clearItemForm} = itemFormSlice.actions;
export default itemFormSlice.reducer;