import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, Form, Col, Row,
} from 'react-bootstrap';
import dishesActions from '../../actions/dishes';

const DishModal = ({
  dish, restaurant, show, setShow, defaultQty,
}) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(defaultQty);

  const addToCart = () => {
    if (qty > 0) {
      console.log(restaurant);
      dispatch(dishesActions.getDishAddedAction(restaurant, dish, qty));
      setShow(false);
    }
  };

  const removeFromCart = () => {
    dispatch(dishesActions.getDishRemovedAction(dish));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dish.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{dish.desc}</Modal.Body>
      <Form className="modal-form">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Qty
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" defaultValue={defaultQty} className="modal-Qty" onChange={(e) => setQty(e.target.value)} />
          </Col>
        </Form.Group>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addToCart}>
          Add To Cart
        </Button>
        <Button variant="danger" onClick={removeFromCart}>
          Remove From Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DishModal;
