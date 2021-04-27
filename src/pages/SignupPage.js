import React from 'react';
import { signupUser } from '../api/UserAPI';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
      'email': evt.target.email.value,
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/login');
    }
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <Form className="Login-form" onSubmit={handleSignup}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Enter Username' name='username' />
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Enter Email' name='email' />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default SignupPage;