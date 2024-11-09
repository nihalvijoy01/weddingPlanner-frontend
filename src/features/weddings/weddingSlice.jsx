import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Weddings
export const fetchWeddings = createAsyncThunk(
  "weddings/fetchWeddings",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return rejectWithValue("User not authenticated.");
    }

    try {
      const response = await axios.get("http://localhost:8000/api/weddings/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        "Failed to fetch wedding projects. Please try again."
      );
    }
  }
);

// Delete Wedding
export const deleteWedding = createAsyncThunk(
  "weddings/deleteWedding",
  async (weddingId, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return rejectWithValue("User not authenticated.");
    }

    try {
      await axios.delete(`http://localhost:8000/api/weddings/${weddingId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return weddingId; // return weddingId to remove it from the state
    } catch (err) {
      return rejectWithValue(
        "Failed to delete the wedding project. Please try again."
      );
    }
  }
);

const weddingSlice = createSlice({
  name: "weddings",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetch weddings
    builder
      .addCase(fetchWeddings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeddings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchWeddings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle delete wedding
      .addCase(deleteWedding.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWedding.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted wedding from the list
        state.list = state.list.filter(
          (wedding) => wedding.id !== action.payload
        );
      })
      .addCase(deleteWedding.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default weddingSlice.reducer;
