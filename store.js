import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import appReducer from "./features/appSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});

export default store;
