import { configureStore } from "@reduxjs/toolkit";
import weddingReducer from "../features/weddings/weddingSlice";

const store = configureStore({
  reducer: {
    weddings: weddingReducer,
  },
});

export default store;
