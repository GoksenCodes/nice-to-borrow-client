import { FETCH_BOOK_DETAILS_SUCCESS } from "./actions";

const initialState = {};

// export default (state = initialState, action) => {
//   switch (action.type)

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_DETAILS_SUCCESS:
      // console.log("INITIAL PAYLOAD", payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
