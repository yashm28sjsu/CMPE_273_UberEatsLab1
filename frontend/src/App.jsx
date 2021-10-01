import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feed from './components/Feed/Feed';
import './App.css';

const App = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  let nav;
  if (user.email != null) {
    nav = (<Nav />);
  }
  return (
    <Router>
      <div className="App">
        {nav}
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route path="/feed" component={Feed} />
          <Route path={['/user/login', '/restaurant/login']} component={Login} />
          <Route path={['/user/signup', '/restaurant/signup']} component={Signup} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
