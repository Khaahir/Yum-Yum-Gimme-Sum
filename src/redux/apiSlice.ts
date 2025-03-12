import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApiKey, fetchMenu, sendOrder, getOrderDetails } from "./api";
import { ApiState, CartProducts, FetchStatus } from "./types";

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

export const showDetails = createAsyncThunk(
  "details/showcart",
  async (orderId: string) => {
    return await getOrderDetails(orderId);
  }
);

const initialState: ApiState = {
  apiKey: "",
  menu: [],
  cartItems: [],
  etaValue: [],
  orderId: "",
  status: "idle",
  error: null,
};

const apiSlice = createSlice({
  name: "apiFetch",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProducts>) => {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiKey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getApiKey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiKey = action.payload;
      })
      .addCase(getApiKey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menu = action.payload;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.etaValue = [action.payload];
      })
      .addCase(sendCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(showDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderId = action.payload;
      })
      .addCase(showDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart } = apiSlice.actions;
export default apiSlice.reducer;
