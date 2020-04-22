import { BOOKSEARCH_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKSEARCH_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
};
