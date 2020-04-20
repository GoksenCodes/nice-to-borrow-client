import React from "react";
import SearchBox from "../../components/SearchBox";
import { useDispatch } from "react-redux";
import { fetchSearchedBooks } from "../../store/searchResult/actions";

export default function HomePage() {
  const dispatch = useDispatch();

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
    </div>
  );
}
