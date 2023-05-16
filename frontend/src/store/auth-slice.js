import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: userInfoFromLocalStorage,
  },
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
    },
    logout(state, action) {
      state.userInfo = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
