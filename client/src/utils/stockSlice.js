// stockSlice for defining the reducers

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    reset: (state) => initialState,
    getStockData: (state, action) => {
      state.results.push(action.payload);
    },
  },
});

export const { getStockData, reset } = stockSlice.actions;
export default stockSlice.reducer;
