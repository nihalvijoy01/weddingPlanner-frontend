import { configureStore } from "@reduxjs/toolkit";
import weddingReducer from "../features/weddings/weddingSlice";
import guestReducer from "../features/guests/guestSlice";

const store = configureStore({
  reducer: {
    weddings: weddingReducer,
    guests: guestReducer,
  },
});

export default store;
