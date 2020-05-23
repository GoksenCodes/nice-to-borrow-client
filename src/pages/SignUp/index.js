import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { selectBookDetails } from "../../store/book/selectors";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const book = useSelector(selectBookDetails);

  useEffect(() => {
    if (token !== null) {
      book.id ? history.push("/:id") : history.push("/");
    }
  }, [token, history]);

  useEffect(() => {
    getPosition();
  }, []);

  const getPosition = () => {
    const coordinatesFromLs = localStorage.getItem("coordinates");
    console.log("COORD in Sigup", coordinatesFromLs);
    const coordinates = JSON.parse(coordinatesFromLs);
    console.log("parsed coord", coordinates);
    const lng = coordinates[0].longitude;
    const lat = coordinates[1].latitude;
    console.log("lng, lat", lng, lat);
    setLatitude(lat);
    setLongitude(lng);
    console.log("coords after getPosition", lng, lat);
  };

  const location = {
    type: "Point",
    coordinates: [longitude, latitude],
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:EPSG::4326"
      }
    }
  };
  console.log("LOCATION", location);
  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(userName, fullName, email, password, location));
    console.log(userName, location);

    setUserName("");
    setFullName("");
    setEmail("");
    setPassword("");
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={userName}
            onChange={event => setUserName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
