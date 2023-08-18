import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";

// If you have more reducers, import them here

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
