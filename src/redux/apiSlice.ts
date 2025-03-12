import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchApiKey, fetchMenu, sendOrder, getOrderDetails } from "./api";
import { ApiState, CartProducts } from "./types";
import { act } from "react";

export const getApiKey = createAsyncThunk("auth/getApiKey", async () => {
  return await fetchApiKey();
});

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  return await fetchMenu();
});

export const sendCart = createAsyncThunk(
  "cart/getCart",
  async (cartItems: CartProducts[]) => {
    return await sendOrder(cartItems);
  }
);

export const showDetails = createAsyncThunk("details/showcart", async () => {
  return await getOrderDetails();
});

const apiSlice = createSlice({
  name: "apiFetch",
  initialState: {
    apiKey: "",
    menu: [],
    cartItems: [],
    etaValue: [],
    orderDetails: [],
  } as ApiState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProducts>) => {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiKey.fulfilled, (state, action) => {
        state.apiKey = action.payload;
        console.log("apikey", action.payload);
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
      })
      .addCase(sendCart.fulfilled, (state, action) => {
        state.etaValue = [action.payload];
      })
      .addCase(showDetails.fulfilled, (state, action) => {
        state.orderDetails = [action.payload];
        console.log(action.payload.order);
      });
  },
});
export const { addToCart } = apiSlice.actions;
export default apiSlice.reducer;
