import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../store/book/actions";
import { useEffect } from "react";
import { selectBookDetails } from "../../store/book/selectors";
import Book from "../../components/Book";

export default function BookDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const book = useSelector(selectBookDetails);
  console.log("BOOK in BOOKDETAILS", book);

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Book
        key={book.id}
        id={book.id}
        title={book.title}
        description={book.description}
        borrowingPeriod={book.borrowingPeriod}
        imageUrl={book.imageUrl}
        isAvailable={book.isAvailable}
        author={book.author}
      />
    </div>
  );
}
