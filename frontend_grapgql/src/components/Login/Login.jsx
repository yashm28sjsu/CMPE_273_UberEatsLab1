import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';
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

// const login = async (e, user, dispatch, setLoggedIn, setError) => {
//   e.preventDefault();

//   const isRestaurant = window.location.href.includes('restaurant');
//   const path = isRestaurant ? '/restaurant/login' : '/user/login';
//   try {
//     const response = await axios.post(url + path, user);
//     if (response.status === 200) {
//       console.log(JSON.stringify(response));
//       const result = response.data.response;
//       if (result.token != null) {
//         window.localStorage.setItem('token', result.token);
//         // console.log(response.data.user);
//         // dispatch(userActions.getLoginAction(result.user));
//         dispatch(userActions.getLoginAction(isRestaurant ? result.restaurant : result.user));
//         console.log('login');
//         setLoggedIn(true);
//       } else {
//         console.log('error');
//         setError(response.data.error);
//       }
//     }
//   } catch (err) {
//     // console.log(err);
//   }

//   axios.defaults.withCredentials = true;
// };

const onChangeListener = (e, setState) => {
  const key = e.target.getAttribute('name');
  const { value } = e.target;
  setState((prevState) => (
    produce(prevState, (draftState) => {
      // eslint-disable-next-line no-param-reassign
      draftState[key] = value;
    })
  ));
};

const LOGIN = gql`
  mutation($user: UserInput) {
  create(user: $user) {
    user {
      _id
      firstname
      lastname
      email
    }
    token
    error
  }
}

`;

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [create, { data: userData }] = useMutation(LOGIN);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const isRestaurant = window.location.href.includes('restaurant');
  const loginText = isRestaurant ? 'Looking to order your favourite food?' : 'Looking for your restaurant login?';
  const loginURL = isRestaurant ? '/user/login' : '/restaurant/login';

  const redirectTag = isRestaurant ? (<Redirect to="/restaurant/orders" />) : (<Redirect to="/feed" />);
  const redirect = isLoggedIn ? redirectTag : '';
  console.log(isLoggedIn);
  return (
    <div className="form-container">
      {redirect}
      <Form onSubmit={(e) => login(e, user, dispatch, setLoggedIn, setError)}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Col sm="10">
            <div className="ubertitle row-tall">
              <span className="uber uberblack">Sober</span>
              {' '}
              <span className="uber ubergreen">Eats</span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Col sm="10">
            <div className="uber ubertext row-tall stay-left">
              <span className="uber uberblack">Welcome Back</span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Col sm="10">
            <Form.Control type="email" placeholder="Email Address" name="username" required onChange={(e) => onChangeListener(e, setUser)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" name="password" required onChange={(e) => onChangeListener(e, setUser)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="10">
            <span className="error stay-left">{error}</span>
            <Button variant="primary" type="submit" className="submit">Sign In</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="10">
            <div className="bottom-text">
              <span>New to Sober-Eats?</span>
              {' '}
              <span><Link className="ubergreen" to="/user/signup">Create Account</Link></span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="10">
            <div className="bottom-text">
              <span>{loginText}</span>
              {' '}
              <span><Link className="ubergreen" to={loginURL}>Sign In Here</Link></span>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="10">
            <div className="bottom-text">
              <span>Want to add your restaurant @ Sober-Eats?</span>
              {' '}
              <span><Link className="ubergreen" to="/restaurant/signup">Create Restaurant&apos;s Account</Link></span>
            </div>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
