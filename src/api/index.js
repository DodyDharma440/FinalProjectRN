import * as firebase from "firebase";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const apiRecipe = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

const apiFavourites = axios.create({
  baseURL: "https://api-user-themealdb.herokuapp.com/favourites",
});

apiFavourites.interceptors.request.use((req) => {
  const userData = firebase.auth().currentUser;

  const token = userData.toJSON().stsTokenManager.accessToken;

  if (userData !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
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

export const deleteAccount = (userData) => {
  return userData.delete();
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

export const getFavMeals = () => {
  return apiFavourites.get("/meals");
};

export const addFavMeal = (value) => {
  return apiFavourites.post("/meals", value);
};

export const removeFavMeal = (id) => {
  return apiFavourites.delete(`/meals/${id}`);
};

export const getFavIngredients = () => {
  return apiFavourites.get("/ingredients");
};

export const addFavIngredient = (value) => {
  return apiFavourites.post("/ingredients", value);
};

export const removeFavIngredient = (id) => {
  return apiFavourites.delete(`/ingredients/${id}`);
};
