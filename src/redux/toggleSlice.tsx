import { createSlice } from "@reduxjs/toolkit";

interface ToggleBool {
  value: boolean;
}

const initialState: ToggleBool = {
  value: false,
};

const toggle = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleFunc: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleFunc } = toggle.actions;
export default toggle.reducer;
