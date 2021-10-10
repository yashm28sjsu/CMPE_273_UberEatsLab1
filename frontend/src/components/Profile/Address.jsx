import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddressModal from './AddressModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const Address = () => {
  const user = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);

  const getAddressRows = (addressdata) => addressdata.map((address) => (
    <Row key={address.id}>
      <div>
        <h5>{address.name}</h5>
        <p>{address.address}</p>
      </div>
      <hr />
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
        && response.error == null) {
        setAddresses(getAddressRows(response.data.addresses));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div>
      <Button variant="primary" style={{ backgroundColor: '#4F9300', border: 'none' }} onClick={(_e) => setShow(true)}>
        Add New Address
      </Button>
      <Container style={{ margin: '10px' }}>
        {addresses}
      </Container>
      <AddressModal
        show={show}
        setShow={setShow}
        getAddresses={getAddresses}
      />
    </div>
  );
};

export default Address;
