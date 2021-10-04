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
        <Route exact path="/feed" component={FeedContainer} />
      </Switch>
    </Router>
  );
};

export default feed;
