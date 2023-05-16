import { createSlice } from "@reduxjs/toolkit";

const orderInitialState = {
  orderMsg: "",
  order: "",
  success: false,
  orderPay: {
    success: false,
    fail: false,
    data: "",
  },
  userOrders: {
    orders: [],
    loading: true,
    error: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    createOrder(state, action) {
      state.order = action.payload;
    },
    setMsg(state, action) {
      state.orderMsg = action.payload;
    },
    isSuccessful(state, action) {
      state.success = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setPaySuccess(state, action) {
      state.orderPay.success = true;
      state.orderPay.data = action.payload;
    },
    setPayFail(state, action) {
      state.orderPay.fail = action.payload;
    },
    payReset(state, action) {
      state.orderPay.success = false;
      state.orderPay.fail = false;
      state.orderPay.data = "";
    },
    setUserOrders(state, action) {
      state.userOrders.orders = action.payload;
      state.userOrders.loading = false;
      state.userOrders.error = "";
    },
    setUserOrdersError(state, action) {
      state.userOrders.error = action.payload;
      state.userOrders.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
