import React from 'react';
import {
  Col, Container, Modal, Row,
} from 'react-bootstrap';

const ReceiptModal = ({ show, setShow, order }) => {
  const dishes = order.orderlineitems.map((lineitem) => (
    <Row key="lineitem.id">
      <Col>
        {lineitem.quantity}
      </Col>
      <Col>
        {lineitem.Dish.name}
      </Col>
      <Col style={{ textAlign: 'right' }}>
        {`$${Math.round(lineitem.Dish.price * lineitem.quantity * 100) / 100}`}
      </Col>
    </Row>
  ));

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h4>Total</h4>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <h4>{`$${order.totalcost}`}</h4>
            </Col>
          </Row>
          <br />
          {dishes}
          <br />
          <Row>
            <Col>
              Subtotal
            </Col>
            <Col style={{ textAlign: 'right' }}>
              {`$${Math.round(order.cost * 100) / 100}`}
            </Col>
          </Row>
          <Row>
            <Col>
              Delivery Charges
            </Col>
            <Col style={{ textAlign: 'right' }}>
              {`$${Math.round(order.cost * 0.2 * 100) / 100}`}
            </Col>
          </Row>
          <Row>
            <Col>
              Tax
            </Col>
            <Col style={{ textAlign: 'right' }}>
              {`$${Math.round(order.cost * 0.09 * 100) / 100}`}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ReceiptModal;
