import axios from "axios";

import { uiActions } from "./ui-slice";
import { authActions } from "./auth-slice";

export const registerAction = (name, email, password) => async (dispatch) => {
  dispatch(uiActions.showLoading());
  dispatch(uiActions.setError(""));

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(authActions.login(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const loginAction = (email, password) => async (dispatch) => {
  dispatch(uiActions.showLoading());
  dispatch(uiActions.setError(""));

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(authActions.login(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
    console.log(error);
  }

  dispatch(uiActions.stopLoading());
};

export const logoutAction = () => async (dispatch) => {
  dispatch(authActions.logout());
  localStorage.removeItem("userInfo");
};
