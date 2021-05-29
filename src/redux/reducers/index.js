import { combineReducers } from "redux";

import auth from "./auth";
import meals from "./meals";
import ingredients from "./ingredients";
import search from "./search";

export default combineReducers({
  auth,
  meals,
  ingredients,
  search,
});
