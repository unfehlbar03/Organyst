import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
