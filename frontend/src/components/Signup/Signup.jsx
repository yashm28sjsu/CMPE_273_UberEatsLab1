import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import produce from 'immer';
import axios from 'axios';
import Restaurant from './Restaurant';
import User from './User';
import userActions from '../../actions/user';
import './Signup.css';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const signup = async (e, user, dispatch, setLoggedIn, setError) => {
  e.preventDefault();

  const isRestaurant = window.location.href.includes('restaurant');
  const path = isRestaurant ? '/restaurant/create' : '/user/create';
  try {
    const response = await axios.post(url + path, user);
    if (response.status === 200) {
      console.log(`${JSON.stringify(response.data)}`);
      const result = response.data.response;
      if (result.token != null) {
        window.localStorage.setItem('token', result.token);
        // console.log(response.data.user);
        dispatch(userActions.getLoginAction(isRestaurant ? result.restaurant : result.user));
        setLoggedIn(true);
      } else {
        setError(result.error);
      }
    }
  } catch (err) {
    // console.log(err);
  }

  axios.defaults.withCredentials = true;
};

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

const Signup = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    country: 'United States',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const isRestaurant = window.location.href.includes('restaurant');
  const redirectTag = isRestaurant ? (<Redirect to="/restaurant/dishes" />) : (<Redirect to="/feed" />);
  const redirect = isLoggedIn ? redirectTag : '';
  const formData = isRestaurant
    ? (
      <Restaurant onChangeListener={onChangeListener} setUser={setUser} error={error.toString()} />
    )
    : (
      <User onChangeListener={onChangeListener} setUser={setUser} error={error.toString()} />
    );

  return (
    <div className="form-container">
      {redirect}
      <Form onSubmit={(e) => signup(e, user, dispatch, setLoggedIn, setError)}>
        {formData}
      </Form>
    </div>
  );
};

export default Signup;
