import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const fetchWeddingDetails = createAsyncThunk(
  "budget/fetchWeddingDetails",
  async ({ weddingId, token }) => {
    const response = await axios.get(
      `http://localhost:8000/api/weddings/${weddingId}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.budget || 0; // Return the budget from the response
  }
);

export const fetchBudgetItems = createAsyncThunk(
  "budget/fetchBudgetItems",
  async ({ weddingId, token }) => {
    const response = await axios.get(
      `http://localhost:8000/api/weddings/${weddingId}/budget/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data || []; // Return the list of budget items
  }
);

export const addBudgetItem = createAsyncThunk(
  "budget/addBudgetItem",
  async ({ weddingId, newItem, token }) => {
    const response = await axios.post(
      `http://localhost:8000/api/weddings/${weddingId}/budget/`,
      newItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Return the new item added
  }
);

export const deleteBudgetItem = createAsyncThunk(
  "budget/deleteBudgetItem",
  async ({ weddingId, itemId, token }) => {
    await axios.delete(
      `http://localhost:8000/api/weddings/${weddingId}/budget/${itemId}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return itemId; // Return the ID of the deleted item
  }
);

// Slice
const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    totalBudget: 0,
    budgetItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetch wedding details
    builder.addCase(fetchWeddingDetails.fulfilled, (state, action) => {
      state.totalBudget = action.payload;
    });
    // Handle fetch budget items
    builder.addCase(fetchBudgetItems.fulfilled, (state, action) => {
      state.budgetItems = action.payload;
    });
    // Handle add budget item
    builder.addCase(addBudgetItem.fulfilled, (state, action) => {
      state.budgetItems.push(action.payload);
    });
    // Handle delete budget item
    builder.addCase(deleteBudgetItem.fulfilled, (state, action) => {
      state.budgetItems = state.budgetItems.filter(
        (item) => item.id !== action.payload
      );
    });
    // Handle errors
    builder.addCase(fetchWeddingDetails.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchBudgetItems.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addBudgetItem.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteBudgetItem.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default budgetSlice.reducer;
