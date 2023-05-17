import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    user: {},
    deleteSuccess: "",
    updateSuccess: "",
    forceRefresh: 0,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSuccess(state, action) {
      state.deleteSuccess = action.payload;
    },
    forceRefresh(state, action) {
      state.forceRefresh = Math.random() * 100;
    },
    setUpdateSuccess(state, action) {
      state.updateSuccess = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
