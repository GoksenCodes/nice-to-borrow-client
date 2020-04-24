import {
  FETCH_AUTHOR_SUCCESS,
  FETCH_IMAGE_SUCCESS,
  FETCH_DESCRIPTION_SUCCESS,
  POST_BOOK_SUCCESS
} from "./actions";

const initialState = {};

// export default (state = initialState, action) => {
//   switch (action.type)

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTHOR_SUCCESS:
      return { ...state, author: action.payload };
    case FETCH_IMAGE_SUCCESS:
      return { ...state, imageUrl: action.payload };
    case FETCH_DESCRIPTION_SUCCESS:
      return { ...state, description: action.payload };
    case POST_BOOK_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
