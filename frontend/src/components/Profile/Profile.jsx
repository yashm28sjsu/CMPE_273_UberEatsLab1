import React from 'react';
import Sidebar from './Sidebar';
import UserProfile from './UserProfile';
import RestaurantProfile from './RestaurantProfile';

const Profile = () => {
  const isRestaurant = window.location.href.includes('restaurant');
  const content = isRestaurant ? (<RestaurantProfile />) : (<UserProfile />);
  return (
    <div className="split-vertical">
      <Sidebar />
      {content}
    </div>
  );
};

export default Profile;
