import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import BookItem from '../../components/BookItem/BookItem.js';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookAPI from '../../api/BookAPI';
import UserContext from '../../contexts/UserContext';
import NYTimesAPI from '../../api/NYTimesAPI';

function BookList(props) {

  const userContext = React.useContext(UserContext);
  console.log('user_context: ', userContext.user)

  const [Books, setBooks] = useState([])

  async function getBooks() {
    console.log('getting books on book list page')
    if (props.list_type === "all-books") {
      let book_list = await BookAPI.fetchBooks()
      setBooks(book_list)
    } else {
      console.log('calling NYTImes')
      let book_list = await NYTimesAPI.fetchBestSellers(props.list_type)
      console.log(book_list.results.books)
      setBooks(book_list.results.books)
    }
  }
  
  useEffect(() => {
    getBooks()
  }, [userContext.user, props.list_type])

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
  }

  function renderBookList() {
    console.log('on the book list page')
    console.log(props.list_type)
    console.log(Books)
    let tableData = Books.map((item, index) => {
     return (
        <ListGroup.Item key={index}>
          <Container>
            <Row>
              <Col sm={10}>
                <BookItem title={item.title} author={item.author} description={item.description} image={item.book_image}/>
              </Col>
              <Col>
                <Button id={item} onClick={() => handleButtonClick(item, "book_list")}>Add To My Book List</Button>
                <Button id={item} onClick={() => handleButtonClick(item, "wish_list")}>Add To Wish List</Button>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
     )
    }) 
    return tableData
  }

  return (
    <div>
      <ListGroup>
        { renderBookList() }
      </ListGroup>
    </div>
  );
}

export default BookList;