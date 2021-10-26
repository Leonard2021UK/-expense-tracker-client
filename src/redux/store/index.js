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
import rootReducer from "../reducers/index";

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    blacklist: [] // jobRecordStore will not be persisted
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
