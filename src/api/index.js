import * as firebase from "firebase";
import axios from "axios";

const apiRecipe = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const signUp = (inputValue) => {
  const { email, password } = inputValue;

  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (inputValue) => {
  const { email, password } = inputValue;

  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const updateProfile = (userData, name) => {
  return userData.updateProfile({
    displayName: name,
  });
};

export const updateEmail = (userData, email) => {
  return userData.updateEmail(email);
};

export const updatePassword = (userData, password) => {
  return userData.updatePassword(password);
};

export const getMealsByCategory = (category) => {
  return apiRecipe.get(`/filter.php?c=${category}`);
};

export const getMealsByIngredient = (ingredient) => {
  return apiRecipe.get(`/filter.php?i=${ingredient}`);
};

export const getDetailMeal = (id) => {
  return apiRecipe.get(`/lookup.php?i=${id}`);
};

export const searchMeals = (searchValue) => {
  return apiRecipe.get(`/search.php?s=${searchValue}`);
};

export const getIngredientList = () => {
  return apiRecipe.get("/list.php?i=list");
};

export const getCategoryList = () => {
  return apiRecipe.get("/categories.php");
};
