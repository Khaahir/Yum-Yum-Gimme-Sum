import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definiera typen för nyckeln som en string
interface keyDataType {
  key: string;
}

export interface MenuItem {
  price: number;
  name: string;
  id: number;
  type: string;
  ingredients: null;
  wonton: string;
}

interface cartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

let menuData = [];

// Uppdatera fetchData för att returnera ett objekt (inte en array)
export const fetchData = createAsyncThunk<keyDataType, void>(
  "api/fetchkey",
  async () => {
    const resp = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
      }
    );
    if (!resp.ok) {
      throw new Error("något gick fel");
    }

    return resp.json();
  }
);
export const fetchDataMenu = createAsyncThunk<MenuItem[], void>(
  "api/fetchData",
  async () => {
    const resp = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
      {
        method: "GET",
        headers: { "x-zocom": "hello" },
      }
    );
    if (!resp.ok) {
      throw new Error("något gick fel");
    }
    menuData = await resp.json();
    return menuData.items;
  }
);

interface ApiState {
  cart: cartItem[];
  apikey: keyDataType | null;
  menuData: MenuItem[]; // Vi hanterar data som ett objekt
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const apiSlice = createSlice({
  name: "apiPosts",
  initialState: {
    cart: [],
    apikey: null,
    menuData: [],
    status: "idle",
    error: null,
  } as ApiState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<keyDataType>) => {
          console.log("Data fetched:", action.payload);
          state.status = "succeeded";
          state.apikey = action.payload;
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Något gick fel";
      })

      .addCase(fetchDataMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDataMenu.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          console.log("Data fetched:", action.payload);
          state.status = "succeeded";
          state.menuData = action.payload;
        }
      )
      .addCase(fetchDataMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Något gick fel";
      });
  },
});
export const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } =
  apiSlice.actions;
export default apiSlice.reducer;
