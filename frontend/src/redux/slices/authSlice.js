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
    studentsList: [],
    unreadMessages: [],
    classrooms: {},
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
    updateTeacherStudent: (state, action) => {
      state.user.studentsList = action.payload;
    },
    updateUnreadMessages: (state, action) => {
      state.user.unreadMessages = action.payload;
    },
    addNewUnreadMessage: (state, action) => {
      state.user.unreadMessages.push(action.payload);
    },
    updateStudentsList: (state, action) => {
      const { data, currentBadge } = action.payload;
      const ids = Object.keys(data);

      ids.forEach((id) => {
        const student = state.user.studentsList.find(
          (student) => student._id === id,
        );

        if (data[id]) {
          student.classroom = currentBadge;
        } else {
          delete student.classroom;
        }
      });
    },
    updateTeacherBadge: (state, action) => {
      const { color, animal } = action.payload;
      if (state.user.classrooms[animal]) {
        state.user.classrooms[animal].push(color);
      } else {
        state.user.classrooms[animal] = [color];
      }
    },
    logout: (state) => {
      state.authState = "logged_out";
      state.user = initialState.user;
    },
  },
});

export const {
  setAuth,
  setUser,
  logout,
  updateStudentTeacher,
  updateTeacherStudent,
  updateUnreadMessages,
  addNewUnreadMessage,
  updateStudentsList,
  updateTeacherBadge,
} = authSlice.actions;

export default authSlice.reducer;
