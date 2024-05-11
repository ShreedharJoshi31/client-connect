// communicationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCommunication,
  getCommunicationsByCustomerId,
  createCommunicationsForAllCustomers, // Added this import
} from "../asyncThunks";

const initialState = {
  communications: [],
  loading: false,
  error: null,
};

const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {},
  extraReducers: {
    [createCommunication.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createCommunication.fulfilled]: (state, action) => {
      state.communications.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    [createCommunication.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getCommunicationsByCustomerId.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCommunicationsByCustomerId.fulfilled]: (state, action) => {
      state.communications = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getCommunicationsByCustomerId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createCommunicationsForAllCustomers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createCommunicationsForAllCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [createCommunicationsForAllCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default communicationSlice.reducer;
