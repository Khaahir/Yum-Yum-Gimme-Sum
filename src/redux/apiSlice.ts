import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApiKey, fetchMenu, sendOrder, getOrderDetails } from "./api";
import { ApiState, CartProducts, FetchStatus, EtaData } from "./types";

export const getApiKey = createAsyncThunk("auth/getApiKey", async () => {
  return await fetchApiKey();
});

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  return await fetchMenu();
});

export const sendCart = createAsyncThunk<
  { order: EtaData } | undefined,
  CartProducts[]
>("cart/getCart", async (cartItems) => {
  const formattedCart = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return await sendOrder(formattedCart);
});

export const showDetails = createAsyncThunk(
  "details/showcart",
  async (orderData: EtaData | undefined) => {
    if (!orderData) {
      throw new Error("Order data is undefined");
    }
    return await getOrderDetails(orderData);
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
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1; // ✅ Now properly increases quantity
      }
    },
    decrease: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1; // ✅ Now properly decreases quantity
        } else {
          state.cartItems.splice(itemIndex, 1); // Remove item if quantity is 0
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
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
      .addCase(
        sendCart.fulfilled,
        (state, action: PayloadAction<{ order: EtaData } | undefined>) => {
          state.status = "succeeded";
          if (action.payload?.order) {
            console.log("✅ sendCart response:", action.payload.order);
            state.etaValue = [action.payload.order];
            state.orderId = action.payload.order.id;
          } else {
            console.error("❌ sendCart fick undefined eller felaktig data!");
          }
        }
      )
      .addCase(sendCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(showDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        showDetails.fulfilled,
        (state, action: PayloadAction<EtaData | undefined>) => {
          state.status = "succeeded";
          if (action.payload) {
            state.etaValue = [action.payload]; // Spara hela orderinformationen
          }
        }
      )
      .addCase(showDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart, decrease, increase, removeFromCart, clearCart } =
  apiSlice.actions;
export default apiSlice.reducer;
