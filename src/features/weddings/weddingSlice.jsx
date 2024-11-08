import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const weddingSlice = createSlice({
  name: "weddings",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
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
      });
  },
});

export default weddingSlice.reducer;
