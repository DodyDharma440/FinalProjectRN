import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  GET_MEALS_BY_CATEGORY,
  GET_FAV_MEALS,
  ADD_FAV_MEAL,
  REMOVE_FAV_MEAL,
} from "my-redux/types";

const meals = {
  loading: false,
  errorMessage: null,
  data: [],
  switchedMeals: [],
  bookmarks: [],
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

    case GET_FAV_MEALS:
      return {
        ...state,
        loading: false,
        bookmarks: action.payload,
      };

    case ADD_FAV_MEAL:
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };

    case REMOVE_FAV_MEAL:
      return {
        ...state,
        loading: false,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
