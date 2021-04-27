import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import BookAPI from '../api/BookAPI.js';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import GoogleBooksAPI from '../api/GoogleBooksAPI';

function AddBookPage(props)  {

  const userContext = React.useContext(UserContext);

  const [List, setList] = useState()
  const [Book, setBook] = useState({title:"",author:"",description:"",book_image:""})

  useEffect( () => {
    async function fetchData() {
      let list = props.match.params.list
      setList(list)
    }
    fetchData();
  }, [props.match.params.list])

  useEffect( () => {
    async function fetchData() {
      let bookId = props.match.params.bookID
      let book_detail = await getBook(bookId)
      setBook(book_detail)
    }
    fetchData();
  }, [props.match.params.bookID])

  const history = useHistory();

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function getGoogleBook(title, author) {
    let title_format = title.replace(/\s/g, '+')
    let author_format = author.replace(/\s/g, '+')
    let data = await GoogleBooksAPI.fetchBook(title_format, author_format)
    return data
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (props.match.params.bookID) {
      //editing existing book
      const bookObject = {
        title: event.target.elements[0].value,
        author: event.target.elements[1].value,
        description: event.target.elements[2].value,
        book_image: event.target.elements[3].value,
      }
      await BookAPI.editBook(props.match.params.bookID, bookObject)
    } else {
      //adding new book
      let book_search = await getGoogleBook(event.target.elements[0].value, event.target.elements[1].value)
      //show error if book_search is empty
      if (!book_search.items) {
        alert("Book not found in google books. Please try again")
        return
      }
      //set book object to google result
      const bookObject = {
        title: book_search.items[0].volumeInfo.title,
        author: book_search.items[0].volumeInfo.authors[0],
        description: book_search.items[0].volumeInfo.description,
        book_image: book_search.items[0].volumeInfo.imageLinks.thumbnail
      }
      let data = await BookAPI.addBook(bookObject)
      // Add book instance to user's list
      let user_books = await BookAPI.fetchBookList(userContext.user, List)
      user_books.books.push(data.id)
      let book_dict = {"books": user_books.books}
      await BookAPI.addBookToList(book_dict, userContext.user[List], List)
    } 
    history.goBack()
  }

  return (
    <div>
      <h1>Enter Book Information</h1> 
      <Form className="Book-form text-center" onSubmit={handleSubmit}>
        <Form.Group controlId="book_title">
          <Form.Label>Book Title</Form.Label>
          <Form.Control defaultValue={Book.title}/>
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control defaultValue={Book.author}/>
        </Form.Group>
        {props.match.params.bookID && 
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={Book.description}/>
          </Form.Group>
        }
        {props.match.params.bookID &&
          <Form.Group controlId="image">
            <Form.Label>Link To Image</Form.Label>
            <Form.Control defaultValue={Book.book_image}/>
          </Form.Group>
        }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddBookPage