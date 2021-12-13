import {createSlice} from "@reduxjs/toolkit";

const fetchedSliceGenerator = (name)=>{
    return createSlice({
        name:name,
        initialState:{
            isFetching:false,
            didInvalidate:true,
            data:[],
            error:{},
            receivedAt: Date.now(),
            response:null
        },
        reducers:{
            [`${name}RequestFetching`]:(state,payload)=>{
                state.isFetching = payload.payload.data;
            },
            [`${name}InValidate`]:(state,payload)=>{
                console.log(payload)
                state.didInvalidate = payload.payload.data;
            },
            [`${name}RequestFail`]:(state,payload)=>{
                state.error = payload.payload.data.data;
                state.response = payload.payload.data;
                state.isFetching = false;
                state.receivedAt = Date.now();
            },
            [`${name}RequestSuccess`]:(state,payload)=> {
                state.data = payload.payload.data.data;
                state.response = payload.payload.data;
                // state.isFetching = false;
                state.receivedAt = Date.now();
            },
            [`${name}RequestException`]:(state,payload)=> {
                state.data = payload.payload.data;
                state.response = payload.payload.data;
                state.isFetching = false;
                state.receivedAt = Date.now();
            }
        }
    });
};
export default fetchedSliceGenerator;
