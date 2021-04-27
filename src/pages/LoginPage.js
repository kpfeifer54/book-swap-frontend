import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  const history = useHistory();

  if (isLoggedIn) {
    history.push("/");
  }

  return (
    <div>
    <h1>Login Page</h1>
    <Form className="Login-form" onSubmit={handleLogin}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Enter Username' name='username' />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <br></br>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;