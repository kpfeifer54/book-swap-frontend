import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import BookAPI from '../../api/BookAPI';
import { fetchUserByID } from '../../api/UserAPI';
import UserContext from '../../contexts/UserContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import BookItem from '../BookItem/BookItem.js';

function SwapAlert(props) {

  const userContext = React.useContext(UserContext);

  const [User2, setUser2] = useState(null)
  const [MyBooks, setMyBooks] = useState([])
  const [SelectedBook, setSelectedBook] = useState()

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
    let selected_book = await BookAPI.fetchBooksByID(e)
    setSelectedBook(selected_book)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const swapObject = {
      user1: userContext.user.id,
      user2: props.user2,
      book1: SelectedBook.id,
      book2: props.book_id,
      status: "proposed"
    }
    return await BookAPI.addSwap(swapObject)
  }

  async function findBook() {
    if (userContext.user) {
        let book_lists = await BookAPI.fetchAllBookLists("book_list")
        for (let list of book_lists) {
          for (let book of list.books) {
            let book_details = await getBook(book)
            if (book_details.title == props.title && book_details.author == props.author) {
              let response = await fetchUserByID(list.user)
              let data = await response.json()
              setUser2(data)
            }
          }
        }
    }
  }

  async function getBook(book_id) {
    return await BookAPI.fetchBooksByID(book_id)
  }
  
  useEffect(() => {
    findBook()
  }, [])

  async function handleButtonClick(event) {
    event.preventDefault()
    const swapObject = {
      user1: userContext.user.id,
      user2: User2.id,
      book1: SelectedBook.id,
      book2: props.book_id,
      status: "proposed"
    }
      return await BookAPI.addSwap(swapObject)
  }

  return (
    <div>
      {User2 && <p>{User2.username} has this book!</p>}
        {User2 && <DropdownButton id="dropdown-item-button" title="Select Book To Swap" onSelect={handleSelect}>
            {MyBooks.map((item) => (
            <Dropdown.Item key={item.id} eventKey={item.id}>{item.title} by {item.author}</Dropdown.Item>
            ))}
        </DropdownButton>}
      {User2 && <Button onClick={(e) => handleButtonClick(e)}>Propose Swap</Button>}
    </div>
  );
}

export default SwapAlert;