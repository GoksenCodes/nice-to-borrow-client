import axios from "axios";
import { apiUrl } from "../../config/constants";
import selectUser from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

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
          `${title} is added, thanks for sharing your book with others!`,
          6000
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
