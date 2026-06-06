import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: "pending",
  user: null,
  type: null,
  plan: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.authState = "unauthenticated";
      state.user = null;
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
