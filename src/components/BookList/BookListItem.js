import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookItem from '../../components/BookItem/BookItem.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookAPI from '../../api/BookAPI';
import UserContext from '../../contexts/UserContext';
import SwapSelect from '../SwapSelect/SwapSelect.js';
import Alert from 'react-bootstrap/Alert'

function BookListItem(props) {
  // props: item. list_type

  const userContext = React.useContext(UserContext);
  const [BookListStatus, setBookListStatus] = useState(false)

  async function handleButtonClick(book, list_type) {
    let book_id = 0
    // Book already exists
    if (book.id) {
      book_id = book.id
    // else add new book to Book model
    } else {
      const bookObject = {
        title: book.title,
        author: book.author,
        description: book.description,
        book_image: book.book_image
      }
      let new_book = await BookAPI.addBook(bookObject)
      book_id = new_book.id
    }
    // Add book instance to user's list
    let user_books = await BookAPI.fetchBookList(userContext.user, list_type)
    user_books.books.push(book_id)
    let book_dict = {"books": user_books.books}
    await BookAPI.addBookToList(book_dict, userContext.user[list_type], list_type)
    setBookListStatus(true)
  }

  function renderButtons(item) {
    return (
      <div>
          <Button className="App-button" id={item} onClick={() => handleButtonClick(item, "book_list")}>+ My Books</Button>
          <Button className="App-button" id={item} onClick={() => handleButtonClick(item, "wish_list")}>+ Wish List</Button>
          {BookListStatus && <Alert variant="light">Book Added!</Alert>}
      </div>
    )
  }

  return (
    <ListGroup.Item key={props.item.id}>
        <Container>
          <Row>
            <Col sm={7}>
              <BookItem book={props.item}/>
            </Col>
            <Col>
              {renderButtons(props.item)}
            </Col>
            <Col>
            {props.list_type === "User Books" && <SwapSelect user2={props.item.user} book_id={props.item.id} title={props.item.title} author={props.item.author}></SwapSelect>}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
  );
}

export default BookListItem;