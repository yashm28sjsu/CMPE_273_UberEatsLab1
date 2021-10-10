import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Modal, Button, Container, Col, Row,
} from 'react-bootstrap';

const CartModal = ({ show, setShow }) => {
  const dishes = useSelector((state) => state.dishes);
  const [checkedOut, setCheckedOut] = useState(false);
  const redirect = checkedOut ? <Redirect to="/checkout" /> : '';

  const rows = dishes.dishes.map((dish) => (
    <Row>
      <Col>{dish.qty}</Col>
      <Col>{dish.name}</Col>
      <Col>
        {`$${Math.round(dish.price * 100) / 100}`}
      </Col>
    </Row>
  ));

  let totalPrice = 0;
  dishes.dishes.forEach((dish) => {
    totalPrice += dish.qty * dish.price;
  });

  const handleClose = () => setShow(false);
  const checkOut = () => {
    setCheckedOut(true);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {redirect}
      <Modal.Header closeButton>
        <Modal.Title>{dishes.restaurant.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body />
      <Container style={{ marginLeft: '30px' }}>
        {rows}
      </Container>
      <Modal.Body />
      <Modal.Footer>
        <Button variant="primary" className="submit" onClick={(_e) => checkOut()}>
          Checkout -
          {' '}
          {`$${Math.round(totalPrice * 100) / 100}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
