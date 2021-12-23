import {createSlice} from "@reduxjs/toolkit";

const itemsTableSlice = createSlice({
    name:"itemsTable",
    initialState:{
        tableState: [
            {
                "unitType": "",
                "itemCategory": "",
                "rowId":0,
                "item":"",
                "amount":"",
                "unitPrice":"",
                "price":""
            }
        ],
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
        updateSelectedRow(state,action){
            const {rowId,fieldName,value} = action.payload;
            console.log(value)
            state.tableState = state.tableState.map(row => row.rowId === rowId ? {...row,[fieldName]:value[0]}:row)
        },
        removeRow(state,action){
            //prevent delete the first line in the table
            if(state.tableState.length > 1){
                const lastRow = state.tableState[state.tableState.length-1];
                state.tableState = state.tableState.filter(existingRow => existingRow !== lastRow);
            }
        },
        removeSelectedRow(state,action){
            //prevent delete the last line in the table
            if(state.tableState.length > 1){
                const {id} = action.payload;
                const selectedRow = state.tableState[id];
                state.tableState = state.tableState.filter(item => item !== selectedRow);
            }

        },
        clearTableState(state,action){
            state.tableState = [
                {
                    "unitType": "",
                    "itemCategory": "",
                    "rowId":0,
                    "item":"",
                    "amount":"",
                    "unitPrice":"",
                    "price":""
                }
            ];
        }
    }
});


export const { setItemTableState,addRow,updateSelectedRow,removeRow,removeSelectedRow,clearTableState} = itemsTableSlice.actions;
export default itemsTableSlice.reducer;