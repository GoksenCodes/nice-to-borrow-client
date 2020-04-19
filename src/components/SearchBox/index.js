import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

export default function SearchBox(props) {
  const [language, setLanguage] = useState("all");
  const [distance, setDistance] = useState("all");
  const [title, setTitle] = useState("all");

  const clickHandler = event => {
    event.preventDefault();
    console.log(title, "title", language, "language", distance, "distance");
    props.getBooks(title, language, distance);
    console.log("PROPS", title, language);
  };

  return (
    <Container className="p-5">
      <Form className="p-5" onSubmit={clickHandler}>
        <Form.Group controlId="formBasicEmail">
          <Row>
            <Col xs={8}>
              <Form.Control
                type="search"
                placeholder="Search a book by title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Col>
            <Col xs={2}>
              <Button variant="primary" type="search" block>
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
              <label className="input-group-text">Search by language</label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="all">All</option>
              <option value="tr">Turkish</option>
              <option value="pt">Portuguese</option>
              <option value="pl">Polish</option>
              <option value="ru">Russian</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </Col>
        <Col xs={4}>
          <div className="input-group p-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Books around me</label>
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
