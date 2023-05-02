import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isFetching: false,
    walletAddress: null,
    error: false,
  },
  reducers: {
    //GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    //LOGOOUT
    logUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logUserSuccess: (state) => {
      state.walletAddress = null;
      state.isFetching = false;
      state.user = {};
    },
    logUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getWalletAddress,
  logUserStart,
  logUserSuccess,
  logUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
