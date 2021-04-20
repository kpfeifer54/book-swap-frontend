import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import BookAPI from '../api/BookAPI.js';
import { Redirect } from 'react-router';

function AddBookPage(props)  {

  async function handleSubmit(event) {
    event.preventDefault()
    const bookObject = {
      title: event.target.elements[0].value,
      author: event.target.elements[1].value,
      description: event.target.elements[2].value,
      image: event.target.elements[3].value
    }
    console.log(bookObject)
      let data = await BookAPI.addBook(bookObject)
      console.log(data)
  }

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="book_title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
}

export default AddBookPage