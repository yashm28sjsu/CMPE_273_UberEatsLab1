import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const ReceiptModal = ({ show, setShow, order }) => {
  const user = useSelector((state) => state.user);
  const [status, setStatus] = useState(order.status);

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
  const updateStatus = async () => {
    const path = '/order/updateStatus/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        url + path,
        { id: user.id, order: { id: order.id, status } },
        { headers },
      );
      if (response.status === 200
        && response.error == null) {
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Address:
          {' '}
          {order.Address.address}
        </p>
        <p>
          Status:
          {' '}
          {
            window.location.href.includes('restaurant')
              ? (
                <Form.Control as="select" defaultValue={order.status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="PLACED">PLACED</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="COOKING">COOKING</option>
                  <option value="PICKEDUP">PICKEDUP</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </Form.Control>
              )
              : order.status
          }
        </p>
        <p>
          Type:
          {' '}
          {order.type}
        </p>
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
      {
        window.location.href.includes('restaurant')
          ? (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={updateStatus}>
                Update Status
              </Button>
            </Modal.Footer>
          )
          : ''
      }
    </Modal>
  );
};

export default ReceiptModal;
