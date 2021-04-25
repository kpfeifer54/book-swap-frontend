import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import BookAPI from '../api/BookAPI.js';
import { useHistory } from 'react-router-dom';

function AddBookPage(props)  {

  let [book, setBook] = useState({title:"",author:"",description:"",book_image:""})

  useEffect(async () => {
    if (props.match) {
    let bookId = props.match.params.bookID
    let book_detail = await getBook(bookId)
    setBook(book_detail)
    }
  }, [])

  const history = useHistory();

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const bookObject = {
      title: event.target.elements[0].value,
      author: event.target.elements[1].value,
      description: event.target.elements[2].value,
      book_image: event.target.elements[3].value
    }
    if (props.match) {
      let data = await BookAPI.editBook(props.match.params.bookID, bookObject)
    } else {
      let data = await BookAPI.addBook(bookObject)
    } 
    // history.push("/books")
    history.goBack()
  }

    return (
      <div>
        <h1>Enter Book Information</h1> 
        <Form className="Book-form text-center" onSubmit={handleSubmit}>
          <Form.Group controlId="book_title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control defaultValue={book.title}/>
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control defaultValue={book.author}/>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={book.description}/>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Link To Image</Form.Label>
            <Form.Control defaultValue={book.book_image}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
}

export default AddBookPage