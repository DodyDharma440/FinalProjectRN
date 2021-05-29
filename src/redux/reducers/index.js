import { combineReducers } from "redux";

import auth from "./auth";
import meals from "./meals";
import categories from "./categories";
import ingredients from "./ingredients";
import search from "./search";

export default combineReducers({
  auth,
  meals,
  categories,
  ingredients,
  search,
});
