import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

export default function SearchBox(props) {
  const [language, setLanguage] = useState("all");
  const [distance, setDistance] = useState("all");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const clickHandler = event => {
    event.preventDefault();
    console.log(
      "Search is Clicked!",
      title,
      "title",
      language,
      "language",
      distance,
      "distance",
      latitude,
      "latitude",
      longitude,
      "longitude"
    );
    props.getBooks(title, language, distance, latitude, longitude);
    console.log("PROPS", title, language, distance, latitude, longitude);
  };

  const showPosition = position => {
    const { latitude, longitude } = position.coords;
    console.log("COORDINATES", latitude, longitude);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  localStorage.setItem(
    "coordinates",
    JSON.stringify([{ longitude }, { latitude }])
  );

  // localStorage.setItem("cart", JSON.stringify([...state, action.payload]))

  const getCoordinates = event => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  return (
    <Container className="p-5">
      <Form className="p-3 pb-5" onSubmit={clickHandler}>
        <Form.Group controlId="formBasicEmail">
          <Row>
            <Col xs={10}>
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
        <Col xs={6}>
          <div className="input-group p-1">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={e => setLanguage(e.target.value)}
            >
              <option disabled selected>
                Search by language
              </option>
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
        <Col xs={6}>
          <div className="input-group p-1">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onFocus={getCoordinates}
              onChange={e => setDistance(e.target.value)}
            >
              <option disabled selected>
                Search books around me
              </option>
              <option value="all">All</option>
              <option value="2000">2 km</option>
              <option value="5000">5 km</option>
              <option value="10000">10 km</option>
            </select>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
