import {
  SEARCH_MEALS,
  SEARCHING,
  SEARCH_ERROR,
  SEARCH_INGREDIENTS,
  RESET_SEARCH_INGREDIENTS,
  RESET_SEARCH_MEALS,
} from "my-redux/types";

const search = {
  loading: false,
  meals: {
    errorMessage: null,
    results: [],
    inputValue: null,
  },
  ingredients: {
    results: [],
    inputValue: null,
  },
};

const reducer = (state = search, action) => {
  switch (action.type) {
    case SEARCHING:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_ERROR:
      return {
        ...state,
        meals: {
          results: [],
          inputValue: null,
          errorMessage: action.errorMessage,
        },
      };

    case SEARCH_MEALS:
      return {
        ...state,
        loading: false,
        meals: {
          results: action.payload.data,
          inputValue: action.payload.inputValue,
        },
      };

    case SEARCH_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          results: action.payload.data,
          inputValue: action.payload.inputValue,
        },
      };

    case RESET_SEARCH_MEALS:
      return {
        ...state,
        loading: false,
        meals: {
          results: [],
          inputValue: null,
        },
      };

    case RESET_SEARCH_INGREDIENTS:
      return {
        ...state,
        loading: false,
        ingredients: {
          results: [],
          inputValue: null,
        },
      };

    default:
      return state;
  }
};

export default reducer;
