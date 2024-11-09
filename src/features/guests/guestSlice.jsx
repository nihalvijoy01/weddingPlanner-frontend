import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  async (weddingId) => {
    const response = await axios.get(
      `http://localhost:8000/api/weddings/${weddingId}/guests`
    );
    return response.data;
  }
);

export const addGuest = createAsyncThunk(
  "guests/addGuest",
  async ({ weddingId, guestData }) => {
    const response = await axios.post(
      `http://localhost:8000/api/weddings/${weddingId}/guests`,
      guestData
    );
    return response.data;
  }
);

const guestSlice = createSlice({
  name: "guests",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(addGuest.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default guestSlice.reducer;
