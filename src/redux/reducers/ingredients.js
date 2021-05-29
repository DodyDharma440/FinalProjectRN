import {
  FETCHING_INGREDIENTS,
  FETCH_ERROR,
  GET_INGREDIENTS,
  GET_FAV_INGREDIENTS,
  ADD_FAV_INGREDIENT,
  REMOVE_FAV_INGREDIENT,
} from "my-redux/types";

const ingredients = {
  loading: false,
  errorMessage: null,
  data: [],
  bookmarks: [],
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

    case GET_FAV_INGREDIENTS:
      return {
        ...state,
        loading: false,
        bookmarks: action.payload,
      };

    case ADD_FAV_INGREDIENT:
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };

    case REMOVE_FAV_INGREDIENT:
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
