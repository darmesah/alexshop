import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: false, errorMsg: "", changeMsg: "" },
  reducers: {
    showLoading(state, action) {
      state.isLoading = true;
    },
    stopLoading(state, action) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.errorMsg = action.payload;
    },
    setProfileChange(state, action) {
      state.changeMsg = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
