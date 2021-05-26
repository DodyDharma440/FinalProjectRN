import {
  FETCH_MEALS_ERROR,
  GET_MEALS,
  SEARCH_MEALS,
  FETCH_INGREDIENTS_ERROR,
  GET_INGREDIENTS,
  FETCH_CATEGORIES_ERROR,
  GET_CATEGORIES,
} from "my-redux/types";
import * as api from "api";

export const getMealsByCategory = (category) => {
  return async (dispatch) => {
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

export const getMealsByIngredient = (ingredient) => {
  return async (dispatch) => {
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
