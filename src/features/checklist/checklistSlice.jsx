import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for asynchronous actions
export const fetchChecklist = createAsyncThunk(
  "checklist/fetchChecklist",
  async (weddingId, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addChecklistItem = createAsyncThunk(
  "checklist/addChecklistItem",
  async ({ weddingId, newItem }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/`,
        newItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteChecklistItem = createAsyncThunk(
  "checklist/deleteChecklistItem",
  async ({ weddingId, id }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const toggleCompleteChecklistItem = createAsyncThunk(
  "checklist/toggleCompleteChecklistItem",
  async ({ weddingId, id, is_completed }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/${id}/`,
        { is_completed: !is_completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    checklist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch checklist
      .addCase(fetchChecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChecklist.fulfilled, (state, action) => {
        state.loading = false;
        state.checklist = action.payload;
      })
      .addCase(fetchChecklist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add checklist item
      .addCase(addChecklistItem.fulfilled, (state, action) => {
        state.checklist.push(action.payload);
      })
      // Delete checklist item
      .addCase(deleteChecklistItem.fulfilled, (state, action) => {
        state.checklist = state.checklist.filter(
          (item) => item.id !== action.payload
        );
      })
      // Toggle complete checklist item
      .addCase(toggleCompleteChecklistItem.fulfilled, (state, action) => {
        const index = state.checklist.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.checklist[index].is_completed = action.payload.is_completed;
        }
      });
  },
});

export default checklistSlice.reducer;
