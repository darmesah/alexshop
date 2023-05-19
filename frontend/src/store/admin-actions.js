import axios from "axios";

import { uiActions } from "./ui-slice";
import { adminActions } from "./admin-slice";

export const getUsersAction = () => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(adminActions.setUsers(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const removeUserAction = (id) => async (dispatch, getState) => {
  dispatch(adminActions.setSuccess(""));

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setSuccess(data.message));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }
};

export const getUserAction = (id) => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(adminActions.setUser(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const updateUserAction = (id, user) => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());
  dispatch(adminActions.setUpdateSuccess(""));

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/users/${id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setUpdateSuccess(data.message));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
  dispatch(adminActions.setSuccess(""));

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setSuccess(data.message));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }
};

export const createProductAction = () => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setCreatedProduct(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const updateProductAction = (id, form) => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setSuccess(data.message));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const getOrdersAction = () => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(adminActions.setOrders(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const deliverOrderAction = (id) => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/deliver/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(adminActions.forceRefresh());
    dispatch(adminActions.setSuccess(data.message));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};
