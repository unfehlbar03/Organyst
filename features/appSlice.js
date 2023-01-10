import { createSlice } from "@reduxjs/toolkit";

const intialState = {
   leader: null,
   taskLeader: null,
   taskFollowers: [],
   users: null,
   tasks: [],
};

export const appSlice = createSlice({
   name: "app",
   initialState: intialState,
   reducers: {
      setLeader: (state, action) => {
         state.leader = action.payload;
      },
      setTasks: (state, action) => {
         state.tasks = action.payload;
      },
      setUsers: (state, action) => {
         state.users = action.payload;
      },
      setTaskLeader: (state, action) => {
         state.taskLeader = action.payload;
      },
      setTaskFollowers: (state, action) => {
         state.taskFollowers = action.payload;
      },
   },
});

export const { setLeader, setTaskLeader, setTaskFollowers, setUsers, setTasks } = appSlice.actions;

export const selectLeader = (state) => state.app.leader;
export const selectTaskLeader = (state) => state.app.taskLeader;
export const selectTaskFollowers = (state) => state.app.taskFollowers;
export const selectUsers = (state) => state.app.users;
export const selectTasks = (state) => state.app.tasks;

export default appSlice.reducer;
