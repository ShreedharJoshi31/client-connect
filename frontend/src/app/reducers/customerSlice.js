import { createSlice } from "@reduxjs/toolkit";
import { getCustomers, getCustomerById } from "../asyncThunks";

const initialState = {
  customers: [],
  customer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: {
    [getCustomers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getCustomerById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCustomerById.fulfilled]: (state, action) => {
      state.customer = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getCustomerById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default customerSlice.reducer;
