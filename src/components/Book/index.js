import React, { useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { borrowBook } from "../../store/book/actions";
import { selectToken } from "../../store/user/selectors";

export default function Book(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  return (
    <div>
      <Jumbotron>
        <h2>{props.title}</h2>
        <img className="d-block w-100" src={props.imageUrl} alt={props.title} />
        <h3>{props.author}</h3>
        <p>{props.description}</p>
        <p>{props.borrowingPeriod}</p>
        <div>
          {props.isAvailable ? (
            <Button
              variant="primary"
              onClick={() => {
                token ? dispatch(borrowBook(props.id)) : history.push("/login");
              }}
            >
              Borrow this book
            </Button>
          ) : (
            <p>Already borrowed! </p>
          )}
        </div>
      </Jumbotron>
    </div>
  );
}
