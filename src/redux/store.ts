import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import apiReducer from "../redux/apiSlice";

export const store = configureStore({
  reducer: { toggle: toggleReducer },
});

export default store;
