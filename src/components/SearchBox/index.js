import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import ISO6391 from "iso-639-1";

export default function SearchBox(props) {
  const [language, setLanguage] = useState("all");
  const [distance, setDistance] = useState("all");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [avLanguages, setAvLanguages] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getLanguages();
    console.log("langs", avLanguages);
  }, [avLanguages]);

  useEffect(() => {
    getCoordinates();
  }, []);

  useEffect(() => {
    toggle && startSearch();
  }, [language, distance]);

  const startSearch = () => {
    props.getBooks(title, language, distance, latitude, longitude);
  };

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

  const getCoordinates = () => {
    // event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  async function getLanguages() {
    const res = await axios.get(`${apiUrl}/books/languages`);
    const langShort = res.data;
    console.log("langShort", langShort);
    const languages = langShort.map(language => ISO6391.getName(language));
    console.log("languages long version", languages);
    if (avLanguages.length === 0) {
      setAvLanguages(languages);
    }
    console.log("languages after setting", avLanguages);
  }

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
              onChange={e => {
                setToggle(true);
                setLanguage(e.target.value);
              }}
            >
              <option disabled selected>
                Search by language
              </option>
              <option value="all">All</option>
              {avLanguages.map(language => {
                return (
                  <option
                    value={ISO6391.getCode(language)}
                    key={language.index}
                  >
                    {language}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </Col>
        <Col xs={6}>
          <div className="input-group p-1">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              // onFocus={getCoordinates}
              onChange={e => {
                setToggle(true);
                setDistance(e.target.value);
              }}
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
