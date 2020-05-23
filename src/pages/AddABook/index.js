import React, { useState } from "react";
import { Form, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addBook } from "../../store/addBook/actions";

import axios from "axios";
import ISO6391 from "iso-639-1";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectToken } from "../../store/user/selectors";

export default function AddABook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [borrowingPeriod, setBorrowingPeriod] = useState("");
  const [language, setLanguage] = useState("");

  const [detailsFromGoogle, setDetailsFromGoogle] = useState({});
  const [author, setAuthor] = useState("");
  const token = useSelector(selectToken);

  const finalDescription = detailsFromGoogle.description
    ? detailsFromGoogle.description
    : description;
  const finalImageUrl = detailsFromGoogle.imageUrl
    ? detailsFromGoogle.imageUrl
    : imageUrl;
  const finalAuthor = detailsFromGoogle.author
    ? detailsFromGoogle.author
    : author;

  function submitForm(event) {
    event.preventDefault();
    if (token) {
      dispatch(
        title && finalAuthor && language && borrowingPeriod
          ? addBook(
              title,
              finalDescription,
              finalImageUrl,
              borrowingPeriod,
              finalAuthor,
              ISO6391.getCode(language)
            )
          : showMessageWithTimeout(
              "danger",
              true,
              `Title, language, author and borrowing period are required fields`,
              3000
            ),
        setDetailsFromGoogle({
          imageUrl: "",
          description: "",
          author: ""
        }),
        setLanguage(""),
        setAuthor(""),
        setBorrowingPeriod(""),
        setTitle(""),
        setDescription("")
      );
    } else {
      history.push("/login");
    }
  }

  function handleGoogleResponse(response) {
    if (response.data.totalItems > 0)
      setDetailsFromGoogle({
        author: response.data.items[0].volumeInfo.authors
          ? response.data.items[0].volumeInfo.authors[0]
          : null,
        imageUrl: response.data.items[0].volumeInfo.imageLinks
          ? response.data.items[0].volumeInfo.imageLinks.thumbnail
          : null,
        description: response.data.items[0].volumeInfo.description
      });
    else {
      const oneSecond = 1000;
      const threeSeconds = oneSecond * 3;
      setTimeout(function() {}, threeSeconds);
      dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          `Details of this book can not found`,
          3000
        )
      );
    }
  }

  function fetchFromGoogle() {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const languageCode = ISO6391.getCode(language);
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:%22${title}%22&langRestrict=${languageCode}&key=${API_KEY}`;
    axios.get(apiUrl).then(handleGoogleResponse);
  }

  function handleSearch(event) {
    event.preventDefault();
    fetchFromGoogle();
  }

  return (
    <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1 className="mt-5 mb-5">Add a book</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="Title of the book"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Control
          value={language}
          onChange={event => setLanguage(event.target.value)}
          type="text"
          placeholder="Language"
        />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit" onClick={handleSearch}>
          Get details from Google Books
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          value={detailsFromGoogle.author ? detailsFromGoogle.author : author}
          onChange={event => setAuthor(event.target.value)}
          type="text"
          placeholder="Author of the book"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={
            detailsFromGoogle.description
              ? detailsFromGoogle.description
              : description
          }
          onChange={event => setDescription(event.target.value)}
          type="text"
          placeholder="Description"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image url</Form.Label>
        <Form.Control
          value={
            detailsFromGoogle.imageUrl ? detailsFromGoogle.imageUrl : imageUrl
          }
          onChange={event => setImageUrl(event.target.value)}
          type="text"
          placeholder="my book image"
        />
        {detailsFromGoogle.imageUrl ? (
          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={detailsFromGoogle.imageUrl} alt="preview" thumbnail />
          </Col>
        ) : null}
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Borrowing Period</Form.Label>
        <Form.Control
          as="select"
          value={borrowingPeriod}
          onChange={e => setBorrowingPeriod(e.target.value)}
        >
          <option>Choose borrowing period</option>
          <option value="14">2 weeks</option>
          <option value="28">4 weeks</option>
          <option value="42">6 weeks</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          ADD!
        </Button>
      </Form.Group>
    </Form>
  );
}

//
