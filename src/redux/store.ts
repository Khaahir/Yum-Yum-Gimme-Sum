import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import counterReducer from "./counterSlice";
export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    counter: counterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
