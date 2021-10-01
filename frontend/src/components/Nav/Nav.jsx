import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Navbar,
  Container,
  Nav as Navigation,
} from 'react-bootstrap';
import userActions from '../../actions/user';
import './Nav.css';

const logout = (e, dispatch) => {
  window.localStorage.setItem('token', {});
  dispatch(userActions.getLogoutAction());
};

const Nav = () => {
  const dispatch = useDispatch();
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="ubertitle">
          <span className="uberblack">Sober</span>
          {' '}
          <span className="ubergreen">Eats</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navigation className="me-auto">
            <Navigation.Link onClick={(e) => logout(e, dispatch)}>Sign Out</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
