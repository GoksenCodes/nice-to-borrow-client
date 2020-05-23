import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { borrowBook } from "../../store/book/actions";
import { selectToken } from "../../store/user/selectors";

export default function Book(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  return (
    <div>
      <Row>
        <Col xs={3}>
          <img
            className="d-block w-100"
            src={props.imageUrl}
            alt={props.title}
          />
          <p className="mt-3 meta-text ">
            <strong>Borrowing period: </strong>
            {props.borrowingPeriod / 7} weeks
          </p>
          <p className="meta-text">
            <strong>Listed by: </strong> {props.owner}
          </p>
        </Col>
        <Col xs={9}>
          <h3 className="base-title">{props.title}</h3>
          <h6>
            <strong>{props.author}</strong>
          </h6>
          <p className="base-text">{props.description}</p>

          <div className="mt-4">
            {props.isAvailable ? (
              <Button
                variant="primary"
                onClick={() => {
                  token
                    ? dispatch(borrowBook(props.id))
                    : history.push("/login");
                }}
              >
                Borrow this book
              </Button>
            ) : (
              <p className="borrowed">Reserved! </p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
