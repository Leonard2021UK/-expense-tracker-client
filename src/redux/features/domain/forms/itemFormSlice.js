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
        setItem(state,action) {
            console.log(state.formState)
            const {item} = action.payload;
            state.formState.item = item;
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
        setUnitType(state,action) {
            const {unitType} = action.payload;
            state.formState.unitType = unitType;
        },
        setPrice(state,action) {
            const {price} = action.payload;
            state.formState.price = price;
        },
        setRowId(state,action) {
            const {rowId} = action.payload;
            state.formState.rowId = rowId;
        },
        clearItemForm(state,action){
            state.formState = {};
        }
    }
});


export const {setPrice, setItemFormState,setUnitType,setItem,setUnitPrice, setAmount,setItemCategory,clearItemForm,setRowId} = itemFormSlice.actions;
export default itemFormSlice.reducer;