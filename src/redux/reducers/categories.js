import { FETCHING_DATA, FETCH_ERROR, GET_CATEGORIES } from "my-redux/types";

const categories = {
  data: [],
};

const reducer = (state = categories, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
