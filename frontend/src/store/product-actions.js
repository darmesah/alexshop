import axios from "axios";

import { productActions } from "./product-slice";
import { uiActions } from "./ui-slice";
import { adminActions } from "./admin-slice";

export const fetchProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    dispatch(uiActions.showLoading());
    dispatch(uiActions.setError(""));

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch(productActions.setProducts(data));
    } catch (error) {
      dispatch(uiActions.setError(error.message));
      console.log(error);
    }

    dispatch(uiActions.stopLoading());
  };

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(adminActions.setCreatedProduct(""));
  dispatch(uiActions.showLoading());
  dispatch(uiActions.setError(""));

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
    );

    dispatch(productActions.setProduct(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const createProductReviewAction =
  (id, review) => async (dispatch, getState) => {
    dispatch(uiActions.showLoading());
    dispatch(productActions.setResponseMessage(""));

    const {
      auth: {
        userInfo: { token },
      },
    } = getState();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(productActions.setResponseMessage(data.message));
    } catch (error) {
      dispatch(productActions.setResponseMessage(error.response.data.message));
    }

    dispatch(uiActions.stopLoading());
  };

export const fetchTopProductsAction = () => async (dispatch) => {
  dispatch(uiActions.showLoading());
  dispatch(uiActions.setError(""));

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/top`
    );

    dispatch(productActions.setTopProducts(data));
  } catch (error) {
    dispatch(uiActions.setError(error.message));
    console.log(error);
  }

  dispatch(uiActions.stopLoading());
};
