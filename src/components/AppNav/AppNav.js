import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AppNav(props) {

  const userContext = React.useContext(UserContext);
  
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">Book Swap</Navbar.Brand>
      { userContext.user &&
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <NavDropdown title="Browse Books" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/books">User Books</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/best-sellers">Best Sellers</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      }   
      { userContext.user ?
        <Nav className="justify-content-end">
          <NavDropdown title={`Hello ${ userContext.user.username }`} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/my-books">My Books</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/wish-list">Wish List</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/swaps">Swaps</NavDropdown.Item>
            <NavDropdown.Item onClick={props.handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
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


