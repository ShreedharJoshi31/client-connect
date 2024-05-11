// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
