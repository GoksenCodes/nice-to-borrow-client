import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, showMessageWithTimeout } from "../appState/actions";

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

    const token = state.user.token;

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

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `${title} is added, thanks for sharing your book with others!`,
          6000
        )
      );
      dispatch({ type: "POST_BOOK_SUCCESSS", payload: response.data });

      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(appDoneLoading());
    }
  };
};
