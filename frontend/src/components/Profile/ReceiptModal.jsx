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

  const dishes = order.lineitems.map((lineitem) => (
    <Row key="lineitem._id">
      <Col>
        {lineitem.quantity}
      </Col>
      <Col>
        {lineitem.dish.name}
      </Col>
      <Col style={{ textAlign: 'right' }}>
        {`$${Math.round(lineitem.dish.price * lineitem.quantity * 100) / 100}`}
      </Col>
    </Row>
  ));

  const handleClose = () => setShow(false);
  const updateStatus = async () => {
    const path = '/order/updateStatus/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { id: order._id, status },
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

  const cancelOrder = async () => {
    const path = '/order/cancel/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { id: order._id, status: 'CANCELLED' },
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
          {order.address.address}
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
        <p>
          Special Instructions:
          {' '}
          {order.instructions}
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {
          window.location.href.includes('restaurant')
            ? (
              <Button variant="primary" onClick={updateStatus}>
                Update Status
              </Button>
            )
            : ''
        }
        {
          window.location.href.includes('user') && order.status === 'PLACED'
            ? (
              <Button variant="danger" onClick={cancelOrder}>
                Cancel Order
              </Button>
            )
            : ''
          }
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
