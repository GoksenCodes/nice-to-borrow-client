import axios from "axios";
import { apiUrl } from "../../config/constants";
import selectUser from "../user/selectors";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const FETCH_BOOK_DETAILS_SUCCESS = "FETCH_BOOK_DETAILS_SUCCESS";
export const BORROW_SUCCESS = "BORROW_SUCCESS";
export const AVAILABILITY_UPDATED = "AVAILABILITY_UPDATED";

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

export const updateBookAvailability = isAvailable => {
  console.log("AVAILABILITY");
  return async (dispatch, getState) => {
    const state = getState();
    const id = state.bookDetails.id;
    console.log("BOOK ID IN PATCH", id);
    const response = await axios.patch(`${apiUrl}/books/${id}`, {
      isAvailable
    });
    dispatch({
      type: "AVAILABILITY_UPDATED",
      payload: response.data
    });
    console.log("AVAILABILITY RESPONSE", response.data);
  };
};

export const borrowBook = (userId, bookId, startDate, endDate) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log("STATE in borrowBook", state);
    const token = state.user.token;
    const userId = state.user.id;
    console.log("USER ID in BORROW", userId);
    const bookId = state.bookDetails.id;
    console.log("BOOK ID IN BORROW", bookId);
    const borrowingPeriod = state.bookDetails.borrowingPeriod;
    const startDate = new Date();
    Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    const endDate = startDate.addDays(borrowingPeriod);
    console.log("START DATE,END DATE", startDate, endDate);
    const bookOwner = state.bookDetails.user.userName;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/borroweditems`,
        {
          bookId,
          userId,
          startDate,
          endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      dispatch({
        type: "BORROW_SUCCESS",
        payload: response.data
      });
      dispatch(updateBookAvailability());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `Your borrow request has been sent! You will hear from ${bookOwner} in 24 hours!`,
          6000
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message, 5000));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message, 5000));
      }
      dispatch(appDoneLoading());
    }
  };
};
