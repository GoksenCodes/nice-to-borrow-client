import { FETCH_BOOK_DETAILS_SUCCESS, AVAILABILITY_UPDATED } from "./actions";

const initialState = {};

// export default (state = initialState, action) => {
//   switch (action.type)

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_DETAILS_SUCCESS:
      // console.log("INITIAL PAYLOAD", payload);
      return { ...state, ...action.payload };
    case AVAILABILITY_UPDATED:
      return { ...state, ...action.payload.book };
    default:
      return state;
  }
};
