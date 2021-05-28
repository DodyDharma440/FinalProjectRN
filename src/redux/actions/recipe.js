import {
  FETCHING_MEALS,
  FETCH_MEALS_ERROR,
  GET_MEALS,
  GET_MEALS_BY_CATEGORY,
  SEARCH_MEALS,
  RESET_SEARCH_MEALS,
  FETCHING_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
  GET_INGREDIENTS,
  SEARCH_INGREDIENTS,
  RESET_SEARCH_INGREDIENTS,
  FETCHING_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  GET_CATEGORIES,
  GET_FAV_MEALS,
  GET_FAV_INGREDIENTS,
  ADD_FAV_MEAL,
  ADD_FAV_INGREDIENT,
  REMOVE_FAV_MEAL,
  REMOVE_FAV_INGREDIENT,
} from "my-redux/types";
import { Alert } from "react-native";
import * as api from "api";

export const getRandomMeals = () => {
  const category = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Vegetarian",
    "Breakfast",
  ];
  const randomIndex = Math.floor(Math.random() * category.length);

  return async (dispatch) => {
    dispatch({
      type: FETCHING_MEALS,
    });

    try {
      const { data } = await api.getMealsByCategory(category[randomIndex]);
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
  return async (dispatch) => {
    dispatch({
      type: FETCHING_MEALS,
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
        type: FETCH_MEALS_ERROR,
        error: error.message,
      });
    }
  };
};

export const resetSearchMeals = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_SEARCH_MEALS,
    });
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
      Alert.alert("Error", error.message);
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
      Alert.alert("Error", error.message);
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
    dispatch({
      type: FETCHING_INGREDIENTS,
    });

    const ingredients = await getState().ingredients.data;

    if (ingredients.length === 0) {
      getIngredientList();
    }

    const filterIngredients = await ingredients.filter((ingredient) => {
      return ingredient.strIngredient
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });

    setTimeout(() => {
      return dispatch({
        type: SEARCH_INGREDIENTS,
        payload: {
          data: searchValue === "" ? [] : filterIngredients,
          searchValue,
        },
      });
    }, 1000);
  };
};

export const resetSearchIngredients = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_SEARCH_INGREDIENTS,
    });
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
