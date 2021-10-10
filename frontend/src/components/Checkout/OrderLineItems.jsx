import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Col, Container, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../actions/order';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const OrderLineItems = () => {
  const dishes = useSelector((state) => state.dishes);
  const user = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({ name: '', address: '' });
  const dispatch = useDispatch();

  const rows = dishes.dishes.map((dish) => (
    <Row style={{ textAlign: 'left' }}>
      <Col className="col-2">{dish.qty}</Col>
      <Col className="col-4">{dish.name}</Col>
      <Col className="col-2">
        {`$${Math.round(dish.price * 100) / 100}`}
      </Col>
    </Row>
  ));

  const getAddresses = async () => {
    const path = '/address/getAddresses/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path, { id: user.id }, { headers });
      if (response.status === 200
        && response.data.addresses != null
        && response.data.addresses) {
        setAddresses(response.data.addresses.map((address) => (
          <option value={JSON.stringify(address)} key={address.id}>{address.name}</option>
        )));
        if (response.data.addresses.length > 0) {
          setSelectedAddress(response.data.addresses[0]);
          dispatch(actions.getOrderAddressSelectedAction(response.data.addresses[0].id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onAddressChange = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
    dispatch(actions.getOrderAddressSelectedAction(JSON.parse(e.target.value).id));
  };

  useEffect(() => {
    getAddresses();
    dispatch(actions.getOrderDeliveryModeSelectedAction(''));
  }, []);

  return (
    <div className="checkout-left">
      <hr className="separator" />
      <h4 className="stay-left">Address</h4>
      <br />
      <Form.Control as="select" onChange={(e) => onAddressChange(e)}>
        {addresses}
      </Form.Control>
      <p className="stay-left" style={{ margin: '10px' }}>
        <b>Address:</b>
        {' '}
        {selectedAddress.address}
      </p>
      <hr className="separator" />
      <h4 className="stay-left">Delivery Mode</h4>
      <Form.Group as={Row} className="mb-3 stay-left" style={{ margin: '10px' }}>
        <Form.Check
          inline
          label="Delivery"
          name="deliveryMode"
          type="radio"
          onClick={(_e) => dispatch(actions.getOrderDeliveryModeSelectedAction('DELIVERY'))}
        />
        <Form.Check
          inline
          label="Pickup"
          name="deliveryMode"
          type="radio"
          onClick={(_e) => dispatch(actions.getOrderDeliveryModeSelectedAction('PICKUP'))}
        />
      </Form.Group>
      <hr className="separator" />
      <h4 className="stay-left">Your Items</h4>
      <Container style={{ width: '80%' }}>
        {rows}
      </Container>
      <hr className="separator" />
    </div>
  );
};

export default OrderLineItems;
