import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  GET_MEALS_BY_CATEGORY,
  SEARCH_MEALS,
  FETCHING_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  GET_INGREDIENTS,
  FETCHING_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  GET_CATEGORIES,
} from "my-redux/types";
import * as api from "api";

export const getRandomMeals = (category) => {
  return async (dispatch) => {
    dispatch({
      type: FETCHING_MEALS,
    });

    try {
      const { data } = await api.getMealsByCategory(category);
      dispatch({
        type: GET_MEALS,
        payload: data.meals,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MEALS_ERROR,
        error: error.message,
      });
    }
  };
};

export const getMealsByCategory = (category) => {
  return async (dispatch) => {
    dispatch({
      type: FETCHING_MEALS,
    });

    try {
      const { data } = await api.getMealsByCategory(category);
      dispatch({
        type: GET_MEALS_BY_CATEGORY,
        payload: data.meals,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MEALS_ERROR,
        error: error.message,
      });
    }
  };
};

export const getMealsByIngredient = (ingredient) => {
  return async (dispatch) => {
    dispatch({
      type: FETCHING_MEALS,
    });

    try {
      const { data } = await api.getMealsByIngredient(ingredient);
      dispatch({
        type: GET_MEALS,
        payload: data.meals,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MEALS_ERROR,
        error: error.message,
      });
    }
  };
};

export const searchMeals = (searchValue) => {
  dispatch({
    type: FETCHING_MEALS,
  });

  return async (dispatch) => {
    try {
      const { data } = await api.searchMeals(searchValue);
      dispatch({
        type: SEARCH_MEALS,
        payload: data.meals,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MEALS_ERROR,
        error: error.message,
      });
    }
  };
};

export const getIngredientList = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCHING_INGREDIENTS,
    });

    try {
      const { data } = await api.getIngredientList();
      dispatch({
        type: GET_INGREDIENTS,
        payload: data.meals,
      });
    } catch (error) {
      dispatch({
        type: FETCH_INGREDIENTS_ERROR,
        error: error.message,
      });
    }
  };
};

export const getCategoryList = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCHING_CATEGORIES,
    });

    try {
      const { data } = await api.getCategoryList();
      dispatch({
        type: GET_CATEGORIES,
        payload: data.categories,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_ERROR,
        error: error.message,
      });
    }
  };
};
