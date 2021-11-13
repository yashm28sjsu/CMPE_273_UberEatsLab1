/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import actions from '../../actions/order';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const Bill = () => {
  const dishes = useSelector((state) => state.dishes);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const dispatch = useDispatch();

  const orderlineitems = dishes.dishes;

  const redirect = isOrderPlaced ? <Redirect to="/user/orders" /> : '';

  let subtotal = 0;
  orderlineitems.forEach((lineitem) => {
    subtotal += parseInt(lineitem.price * lineitem.qty, 10);
  });

  const placeOrder = async () => {
    const lines = dishes.dishes.map((dish) => (
      // eslint-disable-next-line no-underscore-dangle
      { cost: dish.price, quantity: dish.qty, dishId: dish._id }
    ));
    const data = produce(order, (draftOrder) => {
      draftOrder.status = 'PLACED';
      draftOrder.cost = subtotal;
      draftOrder.deliverycost = subtotal * 0.2;
      draftOrder.tax = subtotal * 0.09;
      draftOrder.totalcost = subtotal * 1.29;
      // eslint-disable-next-line no-underscore-dangle
      draftOrder.userId = user._id;
      // eslint-disable-next-line no-underscore-dangle
      draftOrder.restaurantId = dishes.restaurant._id;
      draftOrder.lineitems = lines;
    });
    const path = '/order/create/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { ...data, userId: user._id },
        { headers },
      );
      if (response.status === 200) {
        const result = response.data.response;
        if (result.error == null) {
          setIsOrderPlaced(true);
          dispatch(actions.getOrderPlacedAction());
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="checkout-right" style={{ marginTop: '80px' }}>
      {redirect}
      <Button variant="primary" type="submit" className="submit" onClick={(_e) => placeOrder()}>
        Place Order
      </Button>
      <hr className="separator" />
      <Container style={{ width: '80%', margin: '10px' }} className="stay-left">
        <Row>
          <Col>
            Subtotal
          </Col>
          <Col>
            {`$${Math.round(subtotal * 100) / 100}`}
          </Col>
        </Row>
        <Row>
          <Col>
            Delivery Charges
          </Col>
          <Col>
            {`$${Math.round(subtotal * 0.2 * 100) / 100}`}
          </Col>
        </Row>
        <Row>
          <Col>
            Tax
          </Col>
          <Col>
            {`$${Math.round(subtotal * 0.09 * 100) / 100}`}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Total</h4>
          </Col>
          <Col>
            <h4>
              {`$${Math.round(subtotal * 1.29 * 100) / 100}`}
            </h4>
          </Col>
        </Row>
      </Container>
      <hr className="separator" />

    </div>
  );
};

export default Bill;
