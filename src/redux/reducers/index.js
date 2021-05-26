import { combineReducers } from "redux";

import auth from "./auth";
import meals from "./meals";
import categories from "./categories";
import ingredients from "./ingredients";

export default combineReducers({ auth, meals, categories, ingredients });
