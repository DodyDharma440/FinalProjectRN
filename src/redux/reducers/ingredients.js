import { FETCHING_DATA, FETCH_ERROR, GET_INGREDIENTS } from "my-redux/types";

const ingredients = {
  loading: false,
  errorMessage: null,
  data: [],
};

const reducer = (state = ingredients, action) => {
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

    case GET_INGREDIENTS:
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
