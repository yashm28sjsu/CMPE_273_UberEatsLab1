import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import produce from 'immer';
import axios from 'axios';
import userActions from '../../actions/user';
import './Login.css';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const login = async (e, state, dispatch) => {
  e.preventDefault();

  const path = '/user/login';
  try {
    const response = await axios.post(url + path, state.payload);
    if (response.status === 200 && response.data.token != null) {
      window.localStorage.setItem('token', response.data.token);
      console.log(response.data.user);
      dispatch(userActions.getLoginAction(response.data.user));
    }
  } catch (err) {
    console.log(err);
  }

  axios.defaults.withCredentials = true;
};

const onChangeListener = (e, setState) => {
  const key = e.target.getAttribute('name');
  const { value } = e.target;
  setState((prevState) => (
    produce(prevState, (draftState) => {
      // eslint-disable-next-line no-param-reassign
      draftState.payload[key] = value;
    })
  ));
};

const Login = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    payload: {
      username: '',
      password: '',
    },
  });
  const dispatch = useDispatch();

  return (
    <Form className="mx-auto my-auto" onSubmit={(e) => login(e, state, dispatch)}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type="email" placeholder="email@example.com" name="username" onChange={(e) => onChangeListener(e, setState)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onChangeListener(e, setState)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <Button variant="primary" type="submit">Sign In</Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          New to Sober-Eats?
          {' '}
          <Link to="/signup">Create Account</Link>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Login;
