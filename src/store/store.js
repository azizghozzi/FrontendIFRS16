import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

import userReducer from "../features/userSlice";
import isLoggedInReducer from "../features/miscslices";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user: userReducer,
    isLoggedIn: isLoggedInReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export default store;
//store bta3 redux eli n9ayed fih kol chay