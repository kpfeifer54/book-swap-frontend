import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function HomePage({ isLoggedIn, user, handleLogout }) {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Book Swap!</h1>
        <p>
          This is a site for swapping books
        </p>
        <p>
          <Button variant="primary">Sign up</Button>
        </p>
      </Jumbotron>
      <div>
        Home Page
        {
          user &&
          <div>
            Hi {user.username}
          </div>
        }
        {
          !isLoggedIn
          ?
          <div>
            <div>
              <Link to='/login'>Login</Link>
            </div>
            <div>
              <Link to='/signup'>Signup</Link>
            </div>
          </div>
          :
          <button onClick={handleLogout}>Logout</button>
        }
      </div>
    </div>
  );
}

export default HomePage;