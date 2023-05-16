import axios from "axios";

import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

export const fetchUserData = () => async (dispatch, getState) => {
  dispatch(uiActions.showLoading());

  const {
    auth: {
      userInfo: { token },
    },
  } = getState();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(userActions.setUserProfile(data));
  } catch (error) {
    dispatch(uiActions.setError(error.response.data.message));
  }

  dispatch(uiActions.stopLoading());
};

export const updateUserDataAction =
  (name, email, password) => async (dispatch, getState) => {
    dispatch(uiActions.setError(""));
    dispatch(uiActions.showLoading());

    const {
      auth: {
        userInfo: { token },
      },
    } = getState();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(uiActions.setProfileChange("Profile updated successfully"));
      dispatch(userActions.setUserProfile(data));
    } catch (error) {
      dispatch(uiActions.setError(error.message));
    }

    dispatch(uiActions.stopLoading());
  };
