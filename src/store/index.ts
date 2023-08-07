import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import quotesReducer from "./slices/quotesSlice";

const rootReducer = combineReducers({
  quotes: quotesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
