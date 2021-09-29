import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import './Login.css';

const Login = () => (
  <Form className="mx-auto my-auto">
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Email
      </Form.Label>
      <Col sm="10">
        <Form.Control type="email" placeholder="email@example.com" />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
      <Form.Label column sm="2">
        Password
      </Form.Label>
      <Col sm="10">
        <Form.Control type="password" placeholder="Password" />
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

export default Login;
