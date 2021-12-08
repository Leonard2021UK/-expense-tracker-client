import {createSlice} from "@reduxjs/toolkit";

const appInitDataSlice = createSlice({
    name:"appInitData",
    initialState:{
        appInitData:{}
    },
    reducers:{
        setInitData(state,action) {
            const {appInitData} = action.payload;
            state.appInitData = appInitData;
        },
        clearInitData(state,action){
            state.appInitData = {};
        }
    }
});


export const { setInitData,clearInitData} = appInitDataSlice.actions;
export default appInitDataSlice.reducer;