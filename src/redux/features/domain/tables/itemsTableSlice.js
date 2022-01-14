import {createSlice} from "@reduxjs/toolkit";

const itemsTableSlice = createSlice({
    name:"itemsTable",
    initialState:
         [
            {
            //     "unitType": "",
            //     "itemCategory": "",
                "id":-1,
            //     "item":"",
            //     "amount":"",
            //     "unitPrice":"",
            //     "price":""
            }
        ]
    ,
    reducers:{
        setItemTableState(state,action) {
            const {tableState} = action.payload;
            state = tableState;
        },
        addRow(state,action){
            const {row} = action.payload;
            state = [...state,row]
        },
        updateSelectedRow(state,action){
            const {rowId,fieldName,value} = action.payload;
            state = state.map(row => row.id.rowId === rowId ? {...row,[fieldName]:value[0]}:row)
        },
        removeRow(state,action){
            const lastRow = state[state.length-1];
            state = state.filter(existingRow => existingRow !== lastRow);
        },
        setRowId(state,action) {
            const {rowId} = action.payload;
            // state.id = {rowId:rowId};
        },
        removeSelectedRow(state,action){
            //prevent delete the last line in the table
            if(state.length > 1){
                const {id} = action.payload;
                const selectedRow = state[id];
                state = state.filter(item => item !== selectedRow);
            }

        },
        clearItemTableState(state,action){
            state = [];
        }
    }
});


export const { setItemTableState,setRowId,addRow,updateSelectedRow,removeRow,removeSelectedRow,clearItemTableState} = itemsTableSlice.actions;
export default itemsTableSlice.reducer;