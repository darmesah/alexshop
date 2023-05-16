import axios from "axios";
import { cartActions } from "./cart-slice";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
  );

  dispatch(
    cartActions.addItemToCart({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartActions.removeItemFromCart(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => (dispatch, getState) => {
  dispatch(cartActions.saveShippingAddress(data));

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAction = (data) => (dispatch) => {
  dispatch(cartActions.savePaymentMethod(data));

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
};
