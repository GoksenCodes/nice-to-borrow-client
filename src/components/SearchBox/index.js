import React from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

export default function SearchBox() {
  return (
    <Container className="p-5">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Row>
            <Col xs={10}>
              <Form.Control
                type="search"
                placeholder="Search a book by title"
              />
            </Col>
            <Col xs={2}>
              <Button variant="primary" type="search" block>
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}
