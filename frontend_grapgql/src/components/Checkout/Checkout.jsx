import React from 'react';
import Bill from './Bill';
import OrderLineItems from './OrderLineItems';
import './Checkout.css';

const Checkout = () => (
  <div className="split-vertical">
    <OrderLineItems />
    <Bill />
  </div>
);

export default Checkout;
