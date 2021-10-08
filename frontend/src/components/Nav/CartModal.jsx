import React from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, Container, Col, Row,
} from 'react-bootstrap';

const CartModal = ({ show, setShow }) => {
  const dishes = useSelector((state) => state.dishes);

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
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dishes.restaurant.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body />
      <Container style={{ marginLeft: '30px' }}>
        {rows}
      </Container>
      <Modal.Body />
      <Modal.Footer>
        <Button variant="primary" className="submit">
          Checkout -
          {' '}
          {`$${Math.round(totalPrice * 100) / 100}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
