import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import customerReducer from "./reducers/customerSlice";
import communicationReducer from "./reducers/communicationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    communication: communicationReducer,
  },
});

export default store;
