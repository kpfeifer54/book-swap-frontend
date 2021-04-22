import React, { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import BestSellersSelector from '../components/BestSellersSelector/BestSellersSelector.js';
import BookList from '../components/BookList/BookList.js';

function AllBooksPage(props) {

  const userContext = React.useContext(UserContext);

  const [BookListType, setBookListType] = useState("all-books")

  function handleSelect(e) {
    setBookListType(e)
  }

  function renderBookList() {
    return <BookList list_type={BookListType}/>
  }

  return (
    <div>
      <BestSellersSelector handleSelect={handleSelect}/>
      { renderBookList() }
    </div>
  );
}

export default AllBooksPage;