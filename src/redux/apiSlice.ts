type OrderType = {
  id: number;
  quantity: number;
  name: string;
  price: number;
};

interface MenuItems {
  name: string;
  id: number;
  price: number;
  type: string;
  ingredients: null;
}
interface errors {
  error: { message: string };
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchApiKey,
  fetchTenant,
  fetchMenu,
  addToCart,
  fetchOrderStatus,
} from "./api";

// 🗝️ Hämta API-nyckeln
export const getApiKey = createAsyncThunk("auth/getApiKey", async () => {
  return await fetchApiKey();
});

export const getTenant = createAsyncThunk(
  "tenant/getTenant",
  async (_, { getState }) => {
    const state = getState() as { api: { key: string | null } };
    if (!state.api.key) throw new Error("API key is missing");

    const defaultName = "YUMYUM";
    return await fetchTenant(state.api.key, defaultName);
  }
);

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (_, { getState }) => {
    const state = getState() as { api: { key: string | null } };
    if (!state.api.key) throw new Error("API-nyckel saknas");

    return await fetchMenu(state.api.key);
  }
);
// 🛒 Lägg till order i varukorgen
export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async ({ key, order }: { key: string; order: string }) => {
    return await addToCart(key, order); // ✅
  }
);

// 📦 Hämta orderstatus (ETA och ordernummer)
export const getOrderStatus = createAsyncThunk(
  "order/getOrderStatus",
  async ({ key, id }: { key: string; id: number }) => {
    return await fetchOrderStatus(key, id); // ✅
  }
);

// 🗄️ Redux-slice för API-hantering
const apiSlice = createSlice({
  name: "api",
  initialState: {
    key: "", // ✅ "apiKey" är nu "key"
    tenant: null,
    menu: [] as MenuItems[],
    cart: [] as OrderType[],
    orderStatus: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiKey.fulfilled, (state, action) => {
        state.key = action.payload; // ✅ Sparar API-nyckeln i state
      })
      .addCase(getTenant.fulfilled, (state, action) => {
        state.tenant = action.payload;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(getOrderStatus.fulfilled, (state, action) => {
        state.orderStatus = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action): action is errors => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default apiSlice.reducer;
