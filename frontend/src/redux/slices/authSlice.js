import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: "pending",
  user: null,
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

// Esportiamo le azioni generate automaticamente
export const { setAuth, setUser, logout } = authSlice.actions;

// Esportiamo il reducer per inserirlo nello store
export default authSlice.reducer;
