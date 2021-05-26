import {
  FETCHING_INGREDIENTS,
  FETCH_ERROR,
  GET_INGREDIENTS,
  SEARCH_INGREDIENTS,
  RESET_SEARCH_INGREDIENTS,
} from "my-redux/types";

const ingredients = {
  loading: false,
  errorMessage: null,
  data: [],
  search: {
    results: [],
    searchValue: null,
  },
};

const reducer = (state = ingredients, action) => {
  switch (action.type) {
    case FETCHING_INGREDIENTS:
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

    case SEARCH_INGREDIENTS:
      return {
        ...state,
        loading: false,
        search: {
          results: action.payload.data,
          searchValue: action.payload.searchValue,
        },
      };

    case RESET_SEARCH_INGREDIENTS:
      return {
        ...state,
        loading: false,
        search: {
          results: [],
          searchValue: null,
        },
      };

    default:
      return state;
  }
};

export default reducer;
