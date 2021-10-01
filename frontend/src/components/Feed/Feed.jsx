import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Feed.css';

const feed = () => {
  const user = useSelector((state) => state.user);
  let redirect;
  let greeting = '';
  if (user.email == null) {
    redirect = (<Redirect to="/user/login" />);
  } else {
    greeting = user.type === 'USER' ? 'Order your favourite food.' : 'Configure your restaurant.';
  }
  return (
    <div>
      {redirect}
      <h1>Welcome to Uber Eats!</h1>
      <h2>{greeting}</h2>
    </div>
  );
};

export default feed;
