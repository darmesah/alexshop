import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    pages: "",
    page: "",
    product: "",
    actionMsg: "",
    topProducts: "",
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setResponseMessage(state, action) {
      state.actionMsg = action.payload;
    },
    setTopProducts(state, action) {
      state.topProducts = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
