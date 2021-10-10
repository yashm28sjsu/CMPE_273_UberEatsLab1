import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';

const Restaurant = ({ onChangeListener, setUser, error }) => (
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
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextRestaurantName">
      <Col sm="10">
        <Form.Control type="text" required placeholder="Restaurant Name" name="name" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
      <Col sm="10">
        <Form.Control type="text" required placeholder="Restaurant Address" name="address" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Col sm="10">
        <Form.Control type="email" required placeholder="Email Address" name="email" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
      <Col sm="10">
        <Form.Control type="password" required placeholder="Password" name="password" onChange={(e) => onChangeListener(e, setUser)} />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextCountry">
      <Col sm="10">
        <Form.Control as="select" name="country" required onChange={(e) => onChangeListener(e, setUser)}>
          <option value="United States">United States</option>
          <option value="India">India</option>
        </Form.Control>
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextContact">
      <Col sm="10">
        <Form.Control type="text" placeholder="Contact Number" name="contact" required onChange={(e) => onChangeListener(e, setUser)} />
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
          <span><Link className="ubergreen" to="/restaurant/login">Sign In</Link></span>
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
  </div>
);

export default Restaurant;
