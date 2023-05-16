import axios from "axios";

import { orderActions } from "./order-slice";
import { uiActions } from "./ui-slice";
import { clearCart } from "./cart-actions";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch(orderActions.setMsg(""));
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(orderActions.isSuccessful(true));
    dispatch(orderActions.createOrder(data));
    dispatch(orderActions.setMsg("Order created successfully"));
  } catch (error) {
    dispatch(uiActions.setError(error.message));
  }

  dispatch(uiActions.stopLoading());
  dispatch(clearCart());
};

export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());
  dispatch(uiActions.setError(""));

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(orderActions.setOrder(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const orderPayAction =
  (id, paymentResult) => async (dispatch, getState) => {
    dispatch(uiActions.showLoading());

    const {
      auth: {
        userInfo: { token },
      },
    } = getState();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(orderActions.setPaySuccess(data));
    } catch (error) {
      dispatch(orderActions.setPayFail(true));
    }

    dispatch(uiActions.stopLoading());
  };

export const getUserOrdersAction = () => async (dispatch, getState) => {
  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/myorders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(orderActions.setUserOrders(data));
  } catch (error) {
    dispatch(orderActions.setUserOrdersError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};
