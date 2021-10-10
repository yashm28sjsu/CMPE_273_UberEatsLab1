import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Profile.css';

const Sidebar = () => {
  const isProfile = window.location.href.includes('profile');
  const isOrders = window.location.href.includes('orders');
  const isAddresses = window.location.href.includes('addresses');
  const isFavourites = window.location.href.includes('favourites');
  const location = window.location.href.includes('restaurant') ? '/restaurant' : '/user';

  const addresses = window.location.href.includes('restaurant')
    ? ''
    : (
      <div>
        <Button variant="primary" className={`${isAddresses ? 'active' : ''} sidebar-button`}>
          <Link to={`${location}/addresses`} className="sidebar-link">Addresses</Link>
        </Button>
        <Button variant="primary" className={`${isFavourites ? 'active' : ''} sidebar-button`}>
          <Link to={`${location}/favourites`} className="sidebar-link">Favourites</Link>
        </Button>
      </div>
    );

  return (
    <div className="left">
      <Button variant="primary" className={`${isProfile ? 'active' : ''} sidebar-button`}>
        <Link to={`${location}/profile`} className="sidebar-link">Profile</Link>
      </Button>
      <Button variant="primary" className={`${isOrders ? 'active' : ''} sidebar-button`}>
        <Link to={`${location}/orders`} className="sidebar-link">Orders</Link>
      </Button>
      {addresses}
    </div>
  );
};

export default Sidebar;
