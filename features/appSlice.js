import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  leader: null,
  taskLeader: null,
  taskFollowers: [],
  users: [],
  tasks: [],
  beneficiary: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState: intialState,
  reducers: {
    setLeader: (state, action) => {
      state.leader = action.payload;
    },
    setBeneficiary: (state, action) => {
      state.beneficiary = action.payload;
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
      state.taskFollowers = [...state.taskFollowers, action.payload];
    },
    removeFollower: (state, action) => {
      const index = state.taskFollowers.findIndex(
        (fl) => fl === action.payload
      );
      let newFollowers = [...state.taskFollowers];

      if (index >= 0) {
        newFollowers.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      state.taskFollowers = newFollowers;
    },

    resetFollowers: (state, action) => {
      state.taskFollowers = [];
    },
  },
});

export const {
  setLeader,
  setTaskLeader,
  setTaskFollowers,
  setUsers,
  setTasks,
  removeFollower,
  resetFollowers,
  setBeneficiary,
} = appSlice.actions;

export const selectLeader = (state) => state.app.leader;
export const selectTaskFollowers = (state) => state.app.taskFollowers;
export const selectUsers = (state) => state.app.users;
export const selectTasks = (state) => state.app.tasks;
export const selectBeneficiary = (state) => state.app.beneficiary;

export default appSlice.reducer;
