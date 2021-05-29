import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  GET_FAV_MEALS,
  ADD_FAV_MEAL,
  REMOVE_FAV_MEAL,
} from "my-redux/types";

const meals = {
  bookmarks: [],
};

const reducer = (state = meals, action) => {
  switch (action.type) {
    case GET_FAV_MEALS:
      return {
        ...state,
        bookmarks: action.payload,
      };

    case ADD_FAV_MEAL:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };

    case REMOVE_FAV_MEAL:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
