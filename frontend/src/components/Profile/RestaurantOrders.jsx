import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReceiptModal from './ReceiptModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const RestaurantOrders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ orderlineitems: [], Address: {} });
  const [show, setShow] = useState(false);

  const openOrder = (order) => {
    setSelectedOrder(order);
    setShow(true);
  };

  const getOrderRows = (orderdata) => orderdata.map((order) => {
    const dateParts = order.createdAt.split('-');
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));

    return (
      <Row key={order.id} onClick={(_e) => openOrder(order)}>
        <div className="order-row">
          <h5>{`${order.User.firstname} ${order.User.lastname}`}</h5>
          <p>{`${order.orderlineitems.length} items for $${order.totalcost} on ${jsDate.toDateString()}`}</p>
          <p>{`Status: ${order.status} Type: ${order.type}`}</p>
        </div>
        <hr />
      </Row>
    );
  });

  const getOrders = async () => {
    const path = '/order/getRestaurantOrders/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path, { id: user.id }, { headers });
      if (response.status === 200
        && response.error == null) {
        const data = response.data.orders;
        setOrders(data);
        setFilteredOrders(getOrderRows(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onTypeChange = (e) => {
    setFilteredOrders(getOrderRows(orders.filter((order) => (
      e.target.value === 'ALL' || order.status === e.target.value
    ))));
  };

  return (
    <div>
      <Form.Control as="select" onChange={(e) => onTypeChange(e)}>
        <option value="ALL">ALL</option>
        <option value="PLACED">PLACED</option>
        <option value="ACCEPTED">ACCEPTED</option>
        <option value="COOKING">COOKING</option>
        <option value="PICKEDUP">PICKEDUP</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </Form.Control>
      <Container style={{ margin: '10px' }}>
        {filteredOrders}
      </Container>
      <ReceiptModal
        show={show}
        setShow={setShow}
        order={selectedOrder}
      />
    </div>
  );
};

export default RestaurantOrders;
