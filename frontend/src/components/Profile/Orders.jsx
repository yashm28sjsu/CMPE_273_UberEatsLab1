import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReceiptModal from './ReceiptModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const Orders = () => {
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
    // const dateParts = order.createdAt.split('-');
    // const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
    const jsDate = new Date();

    return (
      <Row key={order.id} onClick={(_e) => openOrder(order)}>
        <div className="order-row">
          <h5>{order.restaurant.name}</h5>
          <p>{`${order.lineitems.length} items for $${order.totalcost} on ${jsDate.toDateString()}`}</p>
          <p>{`Status: ${order.status} Type: ${order.type}`}</p>
        </div>
        <hr />
      </Row>
    );
  });

  const getOrders = async () => {
    const path = '/user/getOrders/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await axios.post(url + path, { userId: user._id }, { headers });
      if (response.status === 200) {
        const result = response.data.response;
        console.log(JSON.stringify(result));
        if (result.error == null) {
          const data = result.orders;
          console.log(data);
          setOrders(data);
          setFilteredOrders(getOrderRows(data));
        }
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

export default Orders;
