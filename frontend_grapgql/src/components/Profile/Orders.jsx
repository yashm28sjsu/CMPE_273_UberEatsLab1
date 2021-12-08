import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container, Form, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReceiptModal from './ReceiptModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const Orders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ lineitems: [], address: {} });
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [paginatedOrders, setPaginatedOrders] = useState([]);

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
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { userId: user._id },
        { headers },
      );
      if (response.status === 200) {
        const result = response.data.response;
        // console.log(JSON.stringify(result));
        if (result.error == null) {
          const data = result.orders;
          // console.log(data);
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

  useEffect(() => {
    // console.log(filteredOrders);
    const low = page > 0 ? pageSize * (page - 1) : 0;
    const sum = low + parseInt(pageSize, 10);
    const high = sum <= filteredOrders.length
      ? sum
      : filteredOrders.length;
    console.log(`${low} ${high} ${pageSize} ${page} ${filteredOrders.length}`);
    setPaginatedOrders(filteredOrders.slice(low, high));
  }, [pageSize, page, filteredOrders]);

  const onTypeChange = (e) => {
    setFilteredOrders(getOrderRows(orders.filter((order) => (
      e.target.value === 'ALL' || order.status === e.target.value
    ))));
  };

  const onPageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const onPageChange = (num) => {
    console.log(num);
    setPage(num);
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
        {paginatedOrders}
      </Container>
      <Form.Group>
        <Row>
          <Col sm="1" />
          <Col sm="1">
            <span>Page Size:</span>
          </Col>
          <Col sm="1">
            <Form.Control type="number" name="pageSize" defaultValue={pageSize} onChange={(e) => onPageSizeChange(e)} />
          </Col>
          <Col sm="1">
            <Button onClick={(_e) => onPageChange(1)}>{'<<'}</Button>
          </Col>
          <Col sm="1">
            <Button onClick={(_e) => onPageChange(page === 1 ? 1 : page - 1)}>{'<'}</Button>
          </Col>
          <Col sm="1">
            <span>{ page }</span>
          </Col>
          <Col sm="1">
            <Button onClick={(_e) => onPageChange(page === (filteredOrders.length / pageSize) ? page : page + 1)}>{'>'}</Button>
          </Col>
          <Col sm="1">
            <Button onClick={(_e) => onPageChange(Math.ceil(filteredOrders.length / pageSize))}>{'>>'}</Button>
          </Col>
        </Row>
      </Form.Group>
      <ReceiptModal
        show={show}
        setShow={setShow}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
