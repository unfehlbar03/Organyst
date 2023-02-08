import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  leader: null,
  taskLeader: null,
  taskFollowers: [],
  users: [],
  tasks: [],
  beneficiary: null,
  Action: false,
  workplace_members: [],
  workplaces: [],
  activeWorkplace: null,
  workplaceDeviceTokens: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState: intialState,
  reducers: {
    setLeader: (state, action) => {
      state.leader = action.payload;
    },

    setActiveWorkplace: (state, action) => {
      state.activeWorkplace = action.payload;
    },
    setWorkplaceMembers: (state, action) => {
      state.workplace_members = [...state.workplace_members, action.payload];
    },
    setWorkplaceDeviceTokens: (state, action) => {
      state.workplaceDeviceTokens = [
        ...state.workplaceDeviceTokens,
        action.payload,
      ];
    },

    setWorkplaces: (state, action) => {
      state.workplaces = action.payload;
    },

    removeWorkplaceMembers: (state, action) => {
      const index = state.workplace_members.findIndex(
        (fl) => fl === action.payload
      );
      let newMembers = [...state.workplace_members];

      if (index >= 0) {
        newMembers.splice(index, 1);
      } else {
        console.warn(
          `Cant remove member (id: ${action.id}) as its not in store!`
        );
      }
      state.workplace_members = newMembers;
    },
    removeWorkplaceTokens: (state, action) => {
      const index = state.workplaceDeviceTokens.findIndex(
        (fl) => fl === action.payload
      );
      let newTokens = [...state.workplaceDeviceTokens];

      if (index >= 0) {
        newTokens.splice(index, 1);
      } else {
        console.warn(
          `Cant remove member (id: ${action.id}) as its not in store!`
        );
      }
      state.workplaceDeviceTokens = newTokens;
    },
    setAction: (state, action) => {
      state.Action = action.payload;
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
    resetWorkplaceMembers: (state, action) => {
      state.workplace_members = [];
    },
    resetWorkplaceTokens: (state, action) => {
      state.workplaceDeviceTokens = [];
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
  setAction,
  setWorkplaceMembers,
  removeWorkplaceMembers,
  resetWorkplaceMembers,
  setWorkplaces,
  setActiveWorkplace,
  setWorkplaceDeviceTokens,
  removeWorkplaceTokens,
  resetWorkplaceTokens,
} = appSlice.actions;

export const selectLeader = (state) => state.app.leader;
export const selectAction = (state) => state.app.Action;
export const selectWorkplaceTokens = (state) => state.app.workplaceDeviceTokens;
export const selectTaskFollowers = (state) => state.app.taskFollowers;
export const selectUsers = (state) => state.app.users;
export const selectTasks = (state) => state.app.tasks;
export const selectBeneficiary = (state) => state.app.beneficiary;
export const selectWorkplaceMembers = (state) => state.app.workplace_members;
export const selectWorkplaces = (state) => state.app.workplaces;
export const selectActiveWorkplace = (state) => state.app.activeWorkplace;

export default appSlice.reducer;
