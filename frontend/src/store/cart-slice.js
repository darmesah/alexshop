import { createSlice } from "@reduxjs/toolkit";

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : "";
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (x) => x.product === newItem.product
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existingItem.product ? newItem : x
        );
      } else {
        state.cartItems.push(newItem);
      }
    },

    // // Mine
    // addItemToCart(state, action) {
    //   const newItem = action.payload;

    //   const existingItem = state.cartItems.find(
    //     (item) => item.id === newItem._id
    //   );

    //   if (!existingItem) {
    //     state.cartItems.push({
    //       _id: newItem.id,
    //       name: newItem.name,
    //       price: newItem.price,
    //       quantity: newItem.quantity,
    //       countInStock: newItem.countInStock
    //     });
    //   } else {
    //     existingItem.quantity += newItem.quantity;
    //   }
    // },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
    },

    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },

    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
