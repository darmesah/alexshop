import axios from "axios";

import { productActions } from "./product-slice";
import { uiActions } from "./ui-slice";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(uiActions.showLoading());
    dispatch(uiActions.setError(""));

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );

      dispatch(productActions.setProducts(data));
    } catch (error) {
      dispatch(uiActions.setError(error.message));
      console.log(error);
    }

    dispatch(uiActions.stopLoading());
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
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
};
