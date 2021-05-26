import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  GET_MEALS_BY_CATEGORY,
  SEARCH_MEALS,
  RESET_SEARCH_MEALS,
} from "my-redux/types";

const meals = {
  loading: false,
  errorMessage: null,
  data: [],
  search: {
    results: [],
    inputValue: null,
  },
  switchedMeals: [],
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

    case GET_MEALS_BY_CATEGORY:
      return {
        ...state,
        loading: false,
        switchedMeals: action.payload,
      };

    case SEARCH_MEALS:
      return {
        ...state,
        loading: false,
        search: {
          results: action.payload.data,
          searchValue: action.payload.searchValue,
        },
      };

    case RESET_SEARCH_MEALS:
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
