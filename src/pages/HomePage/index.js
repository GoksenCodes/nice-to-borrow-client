import React from "react";
import SearchBox from "../../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchedBooks,
  BOOKSEARCH_SUCCESS
} from "../../store/searchResult/actions";
import { selectBooks } from "../../store/searchResult/selectors";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  const getBooks = (title, language, distance, latitude, longitude) => {
    dispatch(
      fetchSearchedBooks(title, language, distance, latitude, longitude)
    );
  };
  return (
    <div>
      <h5>
        Search a book by it's title or check out the books in your language or
        just browse the books around you!
      </h5>
      <SearchBox getBooks={getBooks} />
      <ul>
        {" "}
        {books.map(book => {
          console.log(book);
          return (
            <li key={book.id}>
              <Link to={`/${book.id}`}>
                {book.title} , {book.author}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
