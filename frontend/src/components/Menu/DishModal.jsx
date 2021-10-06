import React, { useState } from 'react';
import {
  Modal, Button, Form, Col, Row,
} from 'react-bootstrap';

const DishModal = ({ dish, show, setShow }) => {
  const handleClose = () => setShow(false);
  const [qty, setQty] = useState(0);

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
            <Form.Control type="number" defaultValue="0" className="modal-Qty" onChange={(e) => setQty(e.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Total Price:
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" readOnly value={dish.price * qty} className="modal-Qty" />
          </Col>
        </Form.Group>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Add To Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DishModal;
