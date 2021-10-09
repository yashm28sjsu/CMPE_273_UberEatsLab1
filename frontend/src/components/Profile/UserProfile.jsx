import React from 'react';
import Account from './Account';
import Address from './Address';
import Orders from './Orders';

const UserProfile = () => {
  const isProfile = window.location.href.includes('profile');
  const isOrders = window.location.href.includes('orders');
  const isAddresses = window.location.href.includes('addresses');

  let content = '';

  if (isProfile) content = <Account />;
  if (isOrders) content = <Orders />;
  if (isAddresses) content = <Address />;

  return (
    <div className="right">
      {content}
    </div>
  );
};

export default UserProfile;
