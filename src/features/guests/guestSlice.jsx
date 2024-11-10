import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("access_token");

// Async thunks for API calls
export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  async (weddingId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/weddings/${weddingId}/guests/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch guests");
    }
  }
);

export const addGuest = createAsyncThunk(
  "guests/addGuest",
  async ({ weddingId, newGuest }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/guests/`,
        newGuest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to add guest");
    }
  }
);

export const deleteGuest = createAsyncThunk(
  "guests/deleteGuest",
  async ({ weddingId, guestId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/weddings/${weddingId}/guests/${guestId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return guestId;
    } catch (err) {
      return rejectWithValue("Failed to delete guest");
    }
  }
);

export const updateGuest = createAsyncThunk(
  "guests/updateGuest",
  async ({ weddingId, guestId, updatedGuest }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/weddings/${weddingId}/guests/${guestId}/`,
        updatedGuest,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to update guest");
    }
  }
);

const guestSlice = createSlice({
  name: "guests",
  initialState: {
    guests: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload);
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter(
          (guest) => guest.id !== action.payload
        );
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        const index = state.guests.findIndex(
          (guest) => guest.id === action.payload.id
        );
        if (index !== -1) {
          state.guests[index] = action.payload;
        }
      });
  },
});

export default guestSlice.reducer;
