import React, { useState } from "react";
import { Form, Col, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { selectBooks } from "../../store/searchResult/selectors";
import { selectBookDetails } from "../../store/book/selectors";
import { addBook } from "../../store/addBook/actions";
import { fetchFromGoogle } from "../../store/addBook/actions";

export default function AddABook() {
  // const book = useSelector(selectBookDetails);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [borrowingPeriod, setBorrowingPeriod] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      addBook(title, description, imageUrl, borrowingPeriod, author, language)
    );
  }

  function getFromGoogle(event) {
    event.preventDefault();
    dispatch(fetchFromGoogle(title));
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
        <Button variant="primary" type="submit" onClick={getFromGoogle}>
          Get details from Google Books
        </Button>
      </Form.Group>

      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          value={author}
          onChange={event => setAuthor(event.target.value)}
          type="text"
          placeholder="Author of the book"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Control
          value={language}
          onChange={event => setLanguage(event.target.value)}
          type="text"
          placeholder="Author of the book"
        />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            placeholder="Description"
          />
        </Form.Group>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Borrowing Period</Form.Label>
        <Form.Control
          as="select"
          value="Choose..."
          onChange={e => setBorrowingPeriod(e.target.value)}
        >
          <option>Choose borrowing period</option>
          <option value="14">2 weeks</option>
          <option value="28">4 weeks</option>
          <option value="42">6 weeks</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Image url</Form.Label>
        <Form.Control
          value={imageUrl}
          onChange={event => setImageUrl(event.target.value)}
          type="text"
          placeholder="my book image"
        />
        {imageUrl ? (
          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={imageUrl} alt="preview" thumbnail />
          </Col>
        ) : null}
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
