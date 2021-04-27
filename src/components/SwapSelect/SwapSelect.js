import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import BookAPI from '../../api/BookAPI';
import UserContext from '../../contexts/UserContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function SwapSelect({user2, book_id}) {

  // props: user2, book_id These identify the book to be swapped.

  const userContext = React.useContext(UserContext);

  const [MyBooks, setMyBooks] = useState([])
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
    const swapObject = {
      user1: userContext.user.id,
      user2: user2,
      book1: e,
      book2: book_id,
      status: "Proposed"
    }
    setSwapStatus(true)
      return await BookAPI.addSwap(swapObject)
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  return (
    <div>
        {!SwapStatus && 
          <DropdownButton className="App-button" id="dropdown-item-button" title="Propose A Swap" onSelect={(e) => handleSelect(e)}>
            {MyBooks.map((item) => (
            <Dropdown.Item key={item.id} eventKey={item.id}>{item.title} by {item.author}</Dropdown.Item>
            ))}
          </DropdownButton>
        }
        {SwapStatus && <p>Swap Submitted!</p>}
    </div>
  );
}

export default SwapSelect;