import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import apiReducer from "./apiSlice";
export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    api: apiReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
