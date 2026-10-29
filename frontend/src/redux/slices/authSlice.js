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
    updateStudentTeacher: (state, action) => {
      if (state.user) {
        state.user.teacherData = action.payload;
      }
    },
    logout: (state) => {
      state.authState = "unauthenticated";
      state.user = null;
    },
  },
});

export const { setAuth, setUser, logout, updateStudentTeacher } =
  authSlice.actions;

export default authSlice.reducer;
