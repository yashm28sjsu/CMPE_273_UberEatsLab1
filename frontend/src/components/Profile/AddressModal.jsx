import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const AddressModal = ({ show, setShow, getAddresses }) => {
  const user = useSelector((state) => state.user);
  const [address, setAddress] = useState({ UserId: user.id });

  const handleClose = () => setShow(false);

  const createAddress = async () => {
    const path = '/address/create/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path, { id: user.id, address }, { headers });
      if (response.status === 200
        && response.error == null) {
        await getAddresses();
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal-form" style={{ margin: '10px' }}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" onChange={(e) => setAddress({ ...address, name: e.target.value })} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Address
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" onChange={(e) => setAddress({ ...address, address: e.target.value })} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={createAddress}>
          Add Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
