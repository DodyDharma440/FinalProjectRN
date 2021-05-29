import {
  SEARCH_MEALS,
  FETCHING_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  GET_INGREDIENTS,
  SEARCH_INGREDIENTS,
  SEARCHING,
  SEARCH_ERROR,
  GET_FAV_MEALS,
  GET_FAV_INGREDIENTS,
  ADD_FAV_MEAL,
  ADD_FAV_INGREDIENT,
  REMOVE_FAV_MEAL,
  REMOVE_FAV_INGREDIENT,
} from "my-redux/types";
import { Alert } from "react-native";
import * as api from "api";

export const searchMeals = (searchValue) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCHING,
    });

    try {
      const { data } = await api.searchMeals(searchValue);
      dispatch({
        type: SEARCH_MEALS,
        payload: {
          data: data.meals,
          searchValue,
        },
      });
    } catch (error) {
      dispatch({
        type: SEARCH_ERROR,
        error: error.message,
      });
    }
  };
};

export const getFavMeals = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.getFavMeals();
      dispatch({
        type: GET_FAV_MEALS,
        payload: data.meals,
      });
    } catch (error) {
      const errorMessage = error.response.data
        ? error.response.data.message
        : error.message;

      Alert.alert("Error", errorMessage);
    }
  };
};

export const addFavMeal = (value, cb) => {
  return async (dispatch) => {
    try {
      const { data } = await api.addFavMeal(value);
      dispatch({
        type: ADD_FAV_MEAL,
        payload: data.newData,
      });
      cb && cb(data.newData);
    } catch (error) {
      const errorMessage = error.response.data
        ? error.response.data.message
        : error.message;

      Alert.alert("Error", errorMessage);
    }
  };
};

export const removeFavMeal = (id, cb) => {
  return async (dispatch) => {
    try {
      await api.removeFavMeal(id);
      dispatch({
        type: REMOVE_FAV_MEAL,
        id,
      });
      cb && cb();
    } catch (error) {
      const errorMessage = error.response.data
        ? error.response.data.message
        : error.message;

      Alert.alert("Error", errorMessage);
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

export const searchIngredients = (searchValue) => {
  return async (dispatch, getState) => {
    const ingredients = await getState().ingredients.data;

    if (ingredients.length === 0) {
      getIngredientList();
    }

    const filterIngredients = await ingredients.filter((ingredient) => {
      return ingredient.strIngredient
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    dispatch({
      type: SEARCH_INGREDIENTS,
      payload: {
        data: searchValue === "" ? [] : filterIngredients,
        searchValue,
      },
    });
  };
};

export const getFavIngredients = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.getFavIngredients();
      dispatch({
        type: GET_FAV_INGREDIENTS,
        payload: data.ingredients,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
};

export const addFavIngredient = (value, cb) => {
  return async (dispatch) => {
    try {
      const { data } = await api.addFavIngredient(value);
      dispatch({
        type: ADD_FAV_INGREDIENT,
        payload: data.newData,
      });
      cb && cb(data.newData);
    } catch (error) {
      const errorMessage = error.response.data
        ? error.response.data.message
        : error.message;

      Alert.alert("Error", errorMessage);
    }
  };
};

export const removeFavIngredient = (id, cb) => {
  return async (dispatch) => {
    try {
      await api.removeFavIngredient(id);
      dispatch({
        type: REMOVE_FAV_INGREDIENT,
        id,
      });
      cb && cb();
    } catch (error) {
      const errorMessage = error.response.data
        ? error.response.data.message
        : error.message;

      Alert.alert("Error", errorMessage);
    }
  };
};
