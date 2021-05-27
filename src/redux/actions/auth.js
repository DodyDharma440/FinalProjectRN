import { AUTH, LOGOUT, GET_USER_DATA } from "my-redux/types";
import * as firebase from "firebase";
import * as api from "api";

export const signUp = (inputValue, cb) => {
  const { name } = inputValue;

  return async (dispatch) => {
    try {
      const res = await api.signUp(inputValue);
      const updatedName = await res.user.updateProfile({
        displayName: name,
      });

      dispatch({
        type: AUTH,
        data: updatedName,
      });
      cb("success");
    } catch (error) {
      cb(null, error);
    }
  };
};

export const signIn = (inputValue, cb) => {
  return async (dispatch) => {
    try {
      const res = await api.signIn(inputValue);
      dispatch({
        type: AUTH,
        data: res,
      });
      cb("success");
    } catch (error) {
      cb(null, error);
    }
  };
};

export const logout = (cb) => {
  return async (dispatch) => {
    try {
      await api.logout();
      dispatch({
        type: LOGOUT,
      });
      cb("success");
    } catch (error) {
      cb(null, error);
    }
  };
};

export const getUserData = (cb) => {
  return async (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch({
          type: GET_USER_DATA,
          data: user,
        });
        cb("success");
      } else {
        dispatch({
          type: LOGOUT,
        });
        cb(null, "error");
      }
    });
  };
};
