import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  average: {
    score: {
      overall: 0,
      cohesion: 0,
      vocabulary: 0,
      grammar: 0,
    },
    errorTypes: {
      spell: 0,
      tens: 0,
      agree: 0,
      prep: 0,
      word: 0,
      order: 0,
      sing: 0,
      art: 0,
      pron: 0,
    },
    mistakes: 0,
    words: 0,
    summaries: 0,
  },
  data: [],
};

const settingsStats = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.average = action.payload.average;
      state.data = action.payload.data;
    },
  },
});

export const { setStats } = settingsStats.actions;

export default settingsStats.reducer;
