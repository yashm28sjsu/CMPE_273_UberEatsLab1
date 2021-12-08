import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import axios from 'axios';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import userActions from '../../actions/user';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const Account = () => {
  const existingUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onChangeListener = (e) => {
    const key = e.target.getAttribute('name');
    const { value } = e.target;
    setUser((prevState) => (
      produce(prevState, (draftState) => {
        // eslint-disable-next-line no-param-reassign
        draftState[key] = value;
      })
    ));
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const path = '/user/update';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const {
        // eslint-disable-next-line no-unused-vars
        __v, _id, type, ...data
      } = user;
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { ...data, id: _id },
        { headers },
      );
      if (response.status === 200) {
        const result = response.data.response;
        if (result.error == null) {
          setError('Updated');
          console.log(result.user);
          dispatch(userActions.getUserUpdateAction(result));
        } else {
          setError(result.error.details[0].message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUser(existingUser);
  }, [existingUser]);

  return (
    <div>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextFirstName">
        <Col sm="10">
          <Form.Control type="text" placeholder="First Name" name="firstname" defaultValue={user.firstname} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextLastName">
        <Col sm="10">
          <Form.Control type="text" placeholder="Last Name" name="lastname" defaultValue={user.lastname} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="10">
          <Form.Control type="email" placeholder="Email Address" name="email" defaultValue={user.email} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
        <Col sm="10">
          <Form.Control type="text" placeholder="City" name="location" defaultValue={user.location} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextDOB">
        <Col sm="10">
          <Form.Control type="date" placeholder="Date of Birth" name="dob" defaultValue={user.dob} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextNickname">
        <Col sm="10">
          <Form.Control type="text" placeholder="Nickname" name="nickname" defaultValue={user.nickname} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextCountry">
        <Col sm="10">
          <Form.Control as="select" name="country" defaultValue={user.country} onChange={(e) => onChangeListener(e)}>
            <option value="United States">United States</option>
            <option value="India">India</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextContact">
        <Col sm="10">
          <Form.Control type="text" placeholder="Contact Number" name="contact" defaultValue={user.contact} onChange={(e) => onChangeListener(e)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <span className="error stay-left">{error}</span>
          <Button variant="primary" type="submit" className="submit" onClick={(e) => updateUser(e)}>Update</Button>
        </Col>
      </Form.Group>
    </div>
  );
};

export default Account;
