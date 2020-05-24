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
    props.getBooks(title, language, distance, latitude, longitude);
  };

  const showPosition = position => {
    const { latitude, longitude } = position.coords;

    setLatitude(latitude);
    setLongitude(longitude);
  };

  localStorage.setItem(
    "coordinates",
    JSON.stringify([{ longitude }, { latitude }])
  );

  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  async function getLanguages() {
    const res = await axios.get(`${apiUrl}/books/languages`);
    const langShort = res.data;
    const languages = langShort.map(language => ISO6391.getName(language));
    if (avLanguages.length === 0) {
      setAvLanguages(languages);
    }
  }

  return (
    <Container className="p-5">
      <Form className="p-3 pb-5" onSubmit={clickHandler}>
        <Form.Group controlId="exampleForm.ControlInput1" className="desktop">
          <Row>
            <Col xs={10}>
              <Form.Control
                type="search"
                placeholder="Search a book by title `Harry Potter`"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Col>
            <Col xs={2}>
              <Button variant="primary" type="search" btn-block="true">
                Search
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2" className="mobile">
          <Row>
            <Col xs={9}>
              <Form.Control
                type="search"
                placeholder="Book Title `Harry Potter`"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Button variant="primary" type="search" btn-block="true">
                Search
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row>
        <Col xs={12} md={6}>
          <div className="input-group p-1">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              defaultValue={"DEFAULT"}
              onChange={e => {
                setToggle(true);
                setLanguage(e.target.value);
              }}
            >
              <option className="desktop" value="DEFAULT" disabled>
                Search by language
              </option>
              <option className="mobile" placeholder="Language" disabled>
                Language
              </option>
              <option value="all">All</option>
              {avLanguages.map(language => {
                return (
                  <option value={ISO6391.getCode(language)} key={language}>
                    {language}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="input-group p-1">
            <select
              className="custom-select"
              defaultValue={"DEFAULT"}
              id="inputGroupSelect01"
              onChange={e => {
                setToggle(true);
                setDistance(e.target.value);
              }}
            >
              <option value="DEFAULT" disabled>
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
