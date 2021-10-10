import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import FeedContainer from './components/FeedContainer/FeedContainer';
import Menu from './components/Menu/Menu';
import './App.css';
import Checkout from './components/Checkout/Checkout';

const App = () => {
  const user = useSelector((state) => state.user);
  const linksProfile = [
    '/user/profile',
    '/restaurant/profile',
    '/user/orders',
    '/restaurant/orders',
    '/user/addresses',
  ];

  let nav;
  if (user.email != null) {
    nav = (<Nav />);
  }

  return (
    <Router>
      <div className="App">
        {nav}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={['/user/login', '/restaurant/login']} component={Login} />
          <Route path={['/user/signup', '/restaurant/signup']} component={Signup} />
          <Route path="/feed" component={FeedContainer} />
          <Route path="/menu" component={Menu} />
          <Route path="/checkout" component={Checkout} />
          <Route path={linksProfile} component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
