import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col, Container, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AddressModal from '../Profile/AddressModal';
import actions from '../../actions/order';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const OrderLineItems = () => {
  const dishes = useSelector((state) => state.dishes);
  const user = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({ name: '', address: '' });
  const [show, setShow] = useState(false);
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
    const path = '/user/getAddresses/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await axios.post(url + path, { userId: user._id }, { headers });
      if (response.status === 200) {
        const result = response.data.response;
        if (result.addresses != null
          && result.addresses) {
          setAddresses(result.addresses.map((address) => (
            <option value={JSON.stringify(address)} key={address.id}>{address.name}</option>
          )));
          if (result.addresses.length > 0) {
            setSelectedAddress(result.addresses[0]);
            // eslint-disable-next-line no-underscore-dangle
            dispatch(actions.getOrderAddressSelectedAction(result.addresses[0]._id));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onAddressChange = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
    // eslint-disable-next-line no-underscore-dangle
    dispatch(actions.getOrderAddressSelectedAction(JSON.parse(e.target.value)._id));
  };

  const onInstructionsChanged = (e) => {
    console.log(e.target.value);
    dispatch(actions.getOrderSpecialInstructionChangedAction(e.target.value));
  };

  useEffect(() => {
    getAddresses();
    dispatch(actions.getOrderDeliveryModeSelectedAction(''));
  }, []);

  const buttonStyle = {
    backgroundColor: '#4F9300',
    border: 'none',
    float: 'left',
    margin: '10px',
  };

  return (
    <div className="checkout-left">
      <hr className="separator" />
      <h4 className="stay-left">Address</h4>
      <br />
      <Button variant="primary" style={buttonStyle} onClick={(_e) => setShow(true)}>
        Add New Address
      </Button>
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
      <h4 className="stay-left">Special Instructions</h4>
      <Form.Group className="mb-3">
        <Form.Control as="textarea" rows={3} name="instructions" onClick={(e) => onInstructionsChanged(e)} />
      </Form.Group>
      <hr className="separator" />
      <AddressModal
        show={show}
        setShow={setShow}
        getAddresses={getAddresses}
      />
    </div>
  );
};

export default OrderLineItems;
