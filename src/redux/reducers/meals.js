import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  SEARCH_MEALS,
} from "my-redux/types";

const meals = {
  loading: false,
  errorMessage: null,
  data: [],
  searchResults: [],
};

const reducer = (state = meals, action) => {
  switch (action.type) {
    case FETCHING_MEALS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MEALS_ERROR:
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };

    case GET_MEALS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case SEARCH_MEALS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
