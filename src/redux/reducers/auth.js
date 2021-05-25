import { AUTH, LOGOUT, GET_USER_DATA } from "my-redux/types";

const auth = {
  userData: {},
  isNotLogin: true,
};

const reducer = (state = auth, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        userData: action?.data,
        isNotLogin: false,
      };

    case LOGOUT:
      return {
        ...state,
        userData: {},
        isNotLogin: true,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userData: action?.data,
      };

    default:
      return state;
  }
};

export default reducer;
