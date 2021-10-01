import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  let redirect;
  if (user.email == null) {
    redirect = (<Redirect to="/user/login" />);
  }
  return (
    <div>
      {redirect}
      <h1>Home!</h1>
    </div>
  );
};

export default Home;
