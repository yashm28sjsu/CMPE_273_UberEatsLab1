import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeedContainer from '../FeedContainer/FeedContainer';
import './Feed.css';
import Menu from '../Menu/Menu';

const feed = () => {
  const user = useSelector((state) => state.user);
  let redirect;
  if (user.email == null) {
    redirect = (<Redirect to="/user/login" />);
  }
  return (
    <Router>
      {redirect}
      <Switch>
        <Route path="/feed" component={FeedContainer} />
        <Route path="/menu" component={Menu} />
      </Switch>
    </Router>
  );
};

export default feed;
