import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import navItems from '../../config/Sections.json';
import UserContext from '../../contexts/UserContext';

function AppNav() {

  const userContext = React.useContext(UserContext);

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Book Swap</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/my-books">My Books</Nav.Link>
        <Nav.Link href="/wish-list">Wish List</Nav.Link>
        <Nav.Link href="/swaps">Swaps</Nav.Link>
        <Nav.Link href="/all-books">Browse Books</Nav.Link>
      </Nav>
      {userContext.user && <p>Hi {userContext.user.username}</p>}
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
      </Form> */}
    </Navbar>
  );
}

export default AppNav;


