import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import settingsReducer from "./slices/settingsSlice";
import statsReducer from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    stats: statsReducer,
  },
});

export default store;
