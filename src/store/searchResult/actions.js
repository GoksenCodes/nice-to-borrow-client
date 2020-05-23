import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";

export const BOOKSEARCH_SUCCESS = "BOOKSEARCH_SUCCESS";

export const fetchSearchedBooks = (
  title,
  language,
  distance,
  latitude,
  longitude
) => {
  return async (dispatch, getState) => {
    if (!title) {
      title = "all";
    }
    try {
      const response = await axios.get(
        `${apiUrl}/books/${title}/${language}/${distance}/${latitude}/${longitude}`
      );
      if (!response.data.length) {
        dispatch(
          showMessageWithTimeout("danger", true, "No result found", 3000)
        );
      }

      dispatch({ type: "BOOKSEARCH_SUCCESS", payload: response.data });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
