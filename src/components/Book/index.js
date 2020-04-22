import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Book(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <Jumbotron>
        <h2>{props.title}</h2>
        <img className="d-block w-100" src={props.imageUrl} alt={props.title} />
        <h3>{props.author}</h3>
        <p>{props.description}</p>
        <p>{props.description}</p>
        <p>{props.borrowingPeriod}</p>
        <div>
          {props.isAvailable ? (
            <Button variant="primary">Borrow this book</Button>
          ) : (
            <p>Borrowed by another user</p>
          )}
        </div>
      </Jumbotron>
    </div>
  );
}
