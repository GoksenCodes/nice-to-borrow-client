import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import books from "./searchResult/reducer";
import bookDetails from "./book/reducer";
import addBook from "./addBook/reducer";

export default combineReducers({
  appState,
  user,
  books,
  bookDetails,
  addBook
});
