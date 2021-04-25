import React, { useState, useEffect } from 'react';
import BookAPI from '../../api/BookAPI';
import { fetchUserByID } from '../../api/UserAPI';
import UserContext from '../../contexts/UserContext';
import SwapSelect from '../SwapSelect/SwapSelect.js';

function SwapAlert(props) {

  const userContext = React.useContext(UserContext);

  const [User2, setUser2] = useState(null)

  useEffect(() => {
    findBook()
  }, [])

  async function getBook(book_id) {
    return await BookAPI.fetchBookByID(book_id)
  }

  async function findBook() {
    if (userContext.user) {
      let book_lists = await BookAPI.fetchAllBookLists("book_list")
      for (let list of book_lists) {
        for (let book of list.books) {
          let book_details = await getBook(book)
          if (book_details.title === props.title && book_details.author === props.author) {
            let response = await fetchUserByID(list.user)
            let data = await response.json()
            setUser2(data)
          }
        }
      }
    }
  }

  return (
    <div>
      {User2 && <p>{User2.username} has this book!</p>}
      {User2 && <SwapSelect user2={User2.id} book_id={props.book_id}></SwapSelect>}
    </div>
  );
}

export default SwapAlert;