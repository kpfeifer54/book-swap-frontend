import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import BookAPI from '../src/api/BookAPI.js';
import UserContext from '../src/contexts/UserContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import BookItem from '../src/components/BookItem/BookItem.js';

function AddSwapPage(props) {

  const userContext = React.useContext(UserContext);

  const [Books, setBooks] = useState([])
  const [SelectedBook, setSelectedBook] = useState()

  async function getBooks() {
    if (userContext.user) {
        let my_book_list = await BookAPI.fetchBookList(userContext.user, "book_list")
        let book_array = await Promise.all(my_book_list.books.map(async (book) => {
          return await getBook(book)
        }))
        setBooks(book_array)
    }
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }
  
  useEffect(() => {
    getBooks()
  }, [userContext.user])

  async function handleSelect(e) {
    let selected_book = await BookAPI.fetchBookByID(e)
    setSelectedBook(selected_book)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const swapObject = {
      user1: userContext.user.id,
      user2: props.user2,
      book1: SelectedBook.id,
      book2: props.book_id,
      status: "Proposed"
    }
    return await BookAPI.addSwap(swapObject)
  }

    return (
      <div>
        <DropdownButton id="dropdown-item-button" title="Select Book To Swap" onSelect={handleSelect}>
            {Books.map((item) => (
            <Dropdown.Item eventKey={item.id}>{item.title} by {item.author}</Dropdown.Item>
            ))}
        </DropdownButton>
        <h2>Swap this book</h2>
        {SelectedBook && <BookItem book={SelectedBook}/>}
        <h2>For this book</h2>
        {SelectedBook && <BookItem book={SelectedBook}/>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="image">
            <Form.Label>Swap This Book</Form.Label>
            <Form.Control/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Swap!
          </Button>
        </Form>
      </div>
    )
}

export default AddSwapPage