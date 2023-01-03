import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  leaders: [],
  taskLeaders: [],
  taskFollowers: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState: intialState,
  reducers: {
    setLeaders: (state, action) => {
      state.leaders = action.payload;
    },
    setTaskLeaders: (state, action) => {
      state.taskLeaders = action.payload;
    },
    setTaskFollowers: (state, action) => {
      state.taskFollowers = action.payload;
    },
  },
});

export const { setLeaders, setTaskLeaders, setTaskFollowers } =
  appSlice.actions;

export const selectLeaders = (state) => state.app.leaders;
export const selectTaskLeaders = (state) => state.app.taskLeaders;
export const selectTaskFollowers = (state) => state.app.taskFollowers;

export default appSlice.reducer;
