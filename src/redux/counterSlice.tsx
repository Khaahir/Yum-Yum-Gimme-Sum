import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addcount: (state) => {
      state.value += 1;
    },

    removeCount: (state) => {
      state.value -= 1;
    },

    addCountByNumber: (state, actions) => {
      state.value += actions.payload;
    },
  },
});

export const { addcount, removeCount, addCountByNumber } = counterSlice.actions;

export default counterSlice.reducer;
