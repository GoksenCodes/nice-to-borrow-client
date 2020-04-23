import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_BOOK_DETAILS_SUCCESS = "FETCH_BOOK_DETAILS_SUCCESS";

export function getBookById(id) {
  return async function(dispatch, getState) {
    const response = await axios.get(`${apiUrl}/books/${id}`);

    dispatch({
      type: "FETCH_BOOK_DETAILS_SUCCESS",
      payload: response.data
    });

    console.log(response.data);
  };
}
