import { createSlice } from "@reduxjs/toolkit";

export const collectorSlice = createSlice({
  name: "collector",
  initialState: {
    collectors: [],
    isFetching: false,
    isMainnet: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectorSuccess: (state, action) => {
      state.isFetching = false;
      state.collectors = action.payload;
      state.collectors.sort((a, b) => b.assets.length - a.assets.length)
    },
    getCollectorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setMainnet: (state) => {
      state.isMainnet = true;
    },
    offSetMainnet: (state) => {
      state.isMainnet = false;
    }
  },
});

export const {
  getCollectorStart,
  getCollectorSuccess,
  getCollectorFailure,
  setMainnet,
  offSetMainnet,
} = collectorSlice.actions;

export default collectorSlice.reducer;
