import axios from "axios";
import { apiUrl } from "../../config/constants";
import selectUser from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const FETCH_AUTHOR_SUCCESS = "FETCH_AUTHOR_SUCCESS";
export const FETCH_DESCRIPTION_SUCCESS = "FETCH_DESCRIPTION_SUCCESS";
export const FETCH_IMAGE_SUCCESS = "FETCH_IMAGE_SUCCESS";
export const POST_BOOK_SUCCESS = "POST_BOOK_SUCCESS ";

export const addBook = (
  title,
  description,
  imageUrl,
  borrowingPeriod,
  author,
  language
) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("STATE in ADDBOOK", state);
    const token = state.user.token;
    console.log(token, state.user);
    try {
      const response = await axios.post(
        `${apiUrl}/books`,
        {
          title,
          description,
          imageUrl,
          borrowingPeriod,
          author,
          language
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Thanks for sharing your book with others!",
          5000
        )
      );
      dispatch({ type: "POST_BOOK_SUCCESSS", payload: response.data });
      console.log("NEW BOOK", response.data);
      dispatch(appDoneLoading());
    } catch (e) {
      // console.log("danger", e.response.data);
      // dispatch(showMessageWithTimeout("danger", false, e.response.data, 3000));
      dispatch(appDoneLoading());
    }
  };
};

export function fetchFromGoogle(title) {
  return async function(dispatch, getState) {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:%22${title}%22&key=AIzaSyBUT3samPWhwmXrmxxc-mqYZc0gaPdPW9s`
    );

    dispatch({
      type: "FETCH_AUTHOR_SUCCESS",
      payload: response.data.items[0].volumeInfo.authors[0]
    });
    dispatch({
      type: "FETCH_IMAGE_SUCCESS",
      payload: response.data.items[0].volumeInfo.imageLinks.thumbnail
    });
    dispatch({
      type: "FETCH_DESCRIPTION_SUCCESS",
      payload: response.data.items[0].volumeInfo.description
    });

    console.log(
      "GOOGLE RESPONSE",
      "author",
      response.data.items[0].volumeInfo.authors[0],
      "image",
      response.data.items[0].volumeInfo.imageLinks.thumbnail,
      "description",
      response.data.items[0].volumeInfo.description
    );
  };
}
