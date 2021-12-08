import React from 'react';
import Dishes from './Dishes';
import RestaurantAccout from './RestaurantAccout';
import RestaurantOrders from './RestaurantOrders';

const RestaurantProfile = () => {
  const isProfile = window.location.href.includes('profile');
  const isOrders = window.location.href.includes('orders');
  const isDishes = window.location.href.includes('dishes');

  let content = '';

  if (isProfile) content = <RestaurantAccout />;
  if (isOrders) content = <RestaurantOrders />;
  if (isDishes) content = <Dishes />;

  return (
    <div className="right">
      {content}
    </div>
  );
};

export default RestaurantProfile;
