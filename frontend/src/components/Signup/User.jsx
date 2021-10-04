import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';

const User = ({ onChangeListener, setUser, error }) => (
  <div>
    <Form.Group as={Row} className="mb-3">
      <Col sm="10">
        <div className="ubertitle row-tall">
          <span className="uber uberblack">Sober</span>
          {' '}
          <span className="uber ubergreen">Eats</span>
        </div>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Col sm="10">
        <div className="uber ubertext row-tall stay-left">
          <span className="uber uberblack">Let&apos;s get Started</span>
        </div>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextFirstName">
      <Col sm="10">
        <Form.Control type="text" placeholder="First Name" name="firstname" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextLastName">
      <Col sm="10">
        <Form.Control type="text" placeholder="Last Name" name="lastname" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Col sm="10">
        <Form.Control type="email" placeholder="Email Address" name="email" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
      <Col sm="10">
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextDOB">
      <Col sm="10">
        <Form.Control type="date" placeholder="Date of Birth" name="dob" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextNickname">
      <Col sm="10">
        <Form.Control type="text" placeholder="Nickname" name="nickname" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextCountry">
      <Col sm="10">
        <Form.Control as="select" name="country" onChange={(e) => onChangeListener(e, setUser)}>
          <option value="United States">United States</option>
          <option value="India">India</option>
        </Form.Control>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextContact">
      <Col sm="10">
        <Form.Control type="text" placeholder="Contact Number" name="contact" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Col sm="10">
        <span className="error stay-left">{error}</span>
        <Button variant="primary" type="submit" className="submit">Sign Up</Button>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
      <Col sm="10">
        <div className="bottom-text">
          <span>Already have a Sober Eats Restaurant?</span>
          {' '}
          <span><Link className="ubergreen" to="/user/login">Sign In</Link></span>
        </div>
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
  </div>
);

User.propTypes = {
  onChangeListener: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  error: PropTypes.string,
};

User.defaultProps = {
  error: '',
};

export default User;
