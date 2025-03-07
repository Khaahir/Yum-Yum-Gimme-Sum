import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definiera typen för nyckeln som en string
interface keyDataType {
  key: string;
}

// Uppdatera fetchData för att returnera ett objekt (inte en array)
export const fetchData = createAsyncThunk<keyDataType, void>(
  "api/fetchData",
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
    // Här returnerar vi ett objekt, inte en array
    return resp.json();
  }
);

interface ApiState {
  data: keyDataType | null; // Vi hanterar data som ett objekt
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const apiKeySlice = createSlice({
  name: "apiKey",
  initialState: {
    data: null, // Data är ett objekt (eller null om vi inte har hämtat data än)
    status: "idle",
    error: null,
  } as ApiState,
  reducers: {},
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
          state.data = action.payload; // Vi lagrar objektet direkt
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Något gick fel";
      });
  },
});

export default apiKeySlice.reducer;
