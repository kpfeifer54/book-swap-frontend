import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import BookAPI from '../../api/BookAPI';
import UserContext from '../../contexts/UserContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function SwapSelect(props) {

  // props: user2, book_id, title, author These identify the book to be swapped. Todo: maybe just pass in book instance?

  const userContext = React.useContext(UserContext);

  const [MyBooks, setMyBooks] = useState([])
  const [SelectedBook, setSelectedBook] = useState()
  const [SwapStatus, setSwapStatus] = useState(false)

  async function getBooks() {
    if (userContext.user) {
        let my_book_list = await BookAPI.fetchBookList(userContext.user, "book_list")
        let book_array = await Promise.all(my_book_list.books.map(async (book) => {
          return await getBook(book)
        }))
        setMyBooks(book_array)
    }
  }
  
  useEffect(() => {
    getBooks()
  }, [userContext.user])

  async function handleSelect(e) {
    let selected_book = await BookAPI.fetchBookByID(e)
    setSelectedBook(selected_book)
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function handleButtonClick(event) {
    event.preventDefault()
    const swapObject = {
      user1: userContext.user.id,
      user2: props.user2,
      book1: SelectedBook.id,
      book2: props.book_id,
      status: "proposed"
    }
    setSwapStatus(true)
      return await BookAPI.addSwap(swapObject)
  }

  return (
    <div>
        <DropdownButton className="App-button" id="dropdown-item-button" title="Select Book To Swap" onSelect={handleSelect}>
            {MyBooks.map((item) => (
            <Dropdown.Item key={item.id} eventKey={item.id}>{item.title} by {item.author}</Dropdown.Item>
            ))}
        </DropdownButton>
        <Button className="App-button" onClick={(e) => handleButtonClick(e)}>Propose Swap</Button>
        {SwapStatus && <p>Swapped Submitted!</p>}
    </div>
  );
}

export default SwapSelect;