import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchApiKey, fetchMenu, handleCheckout } from "./api";
import { ApiState, CartProducts } from "./types";

export const getApiKey = createAsyncThunk("auth/getApiKey", async () => {
  return await fetchApiKey();
});

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  return await fetchMenu();
});

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (cartItems: CartProducts[]) => {
    return await handleCheckout(cartItems);
  }
);
const apiSlice = createSlice({
  name: "apiFetch",
  initialState: {
    apiKey: "",
    menu: [],
    cartItems: [],
    etaValue: [],
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
      .addCase(getCart.fulfilled, (state, action) => {
        state.etaValue = [action.payload.order];
        console.log("ETA received:", action.payload);
      });
  },
});
export const { addToCart } = apiSlice.actions;
export default apiSlice.reducer;
