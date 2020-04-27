import { POST_BOOK_SUCCESS } from "./actions";

const initialState = {};

// export default (state = initialState, action) => {
//   switch (action.type)

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_BOOK_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
