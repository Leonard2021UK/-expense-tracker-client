import {createSlice} from "@reduxjs/toolkit";

const itemsTableSlice = createSlice({
    name:"itemsTable",
    initialState:{
        tableState: [],
    },
    reducers:{
        setItemTableState(state,action) {
            const {tableState} = action.payload;
            state.tableState = tableState;
        },
        addRow(state,action){
            const {row} = action.payload;
            state.tableState = [...state.tableState,row]
        },
        removeRow(state,action){
            const {row} = action.payload;
            state.tableState = state.tableState.filter(existingRow => existingRow !== row);
        },
        clearTableState(state,action){
            state.tableState = [];
        }
    }
});


export const { setItemTableState,clearTableState} = itemsTableSlice.actions;
export default itemsTableSlice.reducer;