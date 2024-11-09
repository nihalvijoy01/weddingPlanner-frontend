import { configureStore } from "@reduxjs/toolkit";
import weddingReducer from "../features/weddings/weddingSlice";
import guestReducer from "../features/guests/guestSlice";
import budgetReducer from "../features/budget/budgetSlice";

const store = configureStore({
  reducer: {
    weddings: weddingReducer,
    guests: guestReducer,
    budget: budgetReducer,
  },
});

export default store;
