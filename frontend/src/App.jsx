import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
