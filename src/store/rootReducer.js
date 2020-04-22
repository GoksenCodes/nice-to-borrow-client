import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import books from "./searchResult/reducer";
import bookDetails from "./book/reducer";

export default combineReducers({
  appState,
  user,
  books,
  bookDetails
});
