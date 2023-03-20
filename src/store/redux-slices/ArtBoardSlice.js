import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections = action.payload;
      state.collections.sort((a, b) => a.createdAt - b.createdAt)
    },
    getCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

  },
});

export const {
  getCollectionStart,
  getCollectionSuccess,
  getCollectionFailure,
} = collectionSlice.actions;

export default collectionSlice.reducer;
