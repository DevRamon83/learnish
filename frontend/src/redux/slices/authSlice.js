import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: "pending",
  user: {
    error: false,
    username: null,
    id: null,
    plan: null,
    type: null,
    pic: { bucketImg: null, fileName: null, storage: null },
    teacherData: { id: null, username: null },
    studentsList: null,
  },
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
      state.user.teacherData = action.payload;
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
