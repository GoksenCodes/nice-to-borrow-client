import React from "react";
import SearchBox from "../../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedBooks } from "../../store/searchResult/actions";
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
    <div className="pt-5">
      <h5>
        Find books in your language or around you! Looking for something
        specific? Search by title!
      </h5>
      <SearchBox getBooks={getBooks} />
      <ul className="p-5 unstyled-list">
        {" "}
        {books.map(book => {
          return (
            <li key={book.id}>
              <Link to={`/${book.id}`}>{book.title}</Link>
              <p>{book.author}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
