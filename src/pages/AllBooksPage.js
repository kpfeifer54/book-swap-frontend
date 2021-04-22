import React, { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import BestSellersSelector from '../components/BestSellers/BestSellersSelector.js';
import BookList from '../components/BookList/BookList.js';

function AllBooksPage(props) {

  const userContext = React.useContext(UserContext);
  console.log('user_context: ', userContext.user)

  const [BookListType, setBookListType] = useState("all-books")

  function handleSelect(e) {
    setBookListType(e)
  }

  function renderBookList() {
    console.log('renderingBookList', BookListType)
    return <BookList list_type={BookListType}/>
  }

  return (
    <div>
      {/* <div>
        <Link to="/add-book" className="btn btn-primary" type="my_books">Add Book</Link>
      </div> */}
      <BestSellersSelector handleSelect={handleSelect}/>
      { renderBookList() }
    </div>
  );
}

export default AllBooksPage;