import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getBooks } from "../../store/search/actions";

export default function SearchBox() {
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("all");
  const [distance, setDistance] = useState("all");

  const clickHandler = () => {
    dispatch(getBooks());
  };

  return (
    <Container className="p-5">
      <Form className="p-5">
        <Form.Group controlId="formBasicEmail">
          <Row>
            <Col xs={8}>
              <Form.Control
                type="search"
                placeholder="Search a book by title"
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="primary"
                type="search"
                block
                onClick={clickHandler}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row>
        <Col xs={4}>
          <div className="input-group p-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Search by language
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="all">All</option>
              <option value="1">Turkish</option>
              <option value="2">Portuguese</option>
              <option value="3">Polish</option>
              <option value="3">Russian</option>
              <option value="3">French</option>
              <option value="3">Spanish</option>
            </select>
          </div>
        </Col>
        <Col xs={4}>
          <div className="input-group p-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Books around me
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={e => setDistance(e.target.value)}
            >
              <option value="all">All</option>
              <option value="1">2 km</option>
              <option value="2">5 km</option>
              <option value="3">10 km</option>
            </select>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
