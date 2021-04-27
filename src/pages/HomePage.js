import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import BookCarousel from '../components/BookCarousel/BookCarousel.js';

function HomePage({ isLoggedIn, user, handleLogout }) {

  const history = useHistory();

  return (
    <div>
      <Jumbotron fluid>
        <h1>Welcome to Book Swap!</h1>
        <p>This is a site for swapping books</p>
        <BookCarousel></BookCarousel>
        <br></br>
        {
          !isLoggedIn &&
          <div>
            <Button onClick={() => {history.push("/signup")}}>Signup</Button>
          </div>
        }
      </Jumbotron>
    </div>
  );
}

export default HomePage;