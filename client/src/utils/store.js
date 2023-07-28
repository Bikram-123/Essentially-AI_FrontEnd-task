import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./stockSlice";

// store for global state
const store = configureStore({
  reducer: {
    stock: stockSlice,
  },
});

export default store;
