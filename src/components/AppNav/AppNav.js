import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function AppNav(props) {

  const userContext = React.useContext(UserContext);
  
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">Book Swap</Navbar.Brand>
      { userContext.user &&
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/books">Browse Books</Nav.Link>
          <Nav.Link as={Link} to="/my-books">My Books</Nav.Link>
          <Nav.Link as={Link} to="/wish-list">Wish List</Nav.Link>
          <Nav.Link as={Link} to="/swaps">Swaps</Nav.Link>
        </Nav>
      }   
      { userContext.user ?
        <Nav className="justify-content-end">
          <Nav.Link disabled>Hi { userContext.user.username }</Nav.Link>
          <Nav.Item>
            <Button onClick={props.handleLogout}>Logout</Button>
          </Nav.Item>
        </Nav>
        :
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        </Nav>
      }
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
      </Form> */}
    </Navbar>
  );
}

export default AppNav;


