import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import appReducer from "../reducers/index";

const rootReducer = (state,action) =>{

    if(action.type === "LOGOUT"){
       return appReducer(undefined,action)
    }

    return appReducer(state, action);
}

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    blacklist: [] // stores listed will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }

    })
});
export const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export default store;
