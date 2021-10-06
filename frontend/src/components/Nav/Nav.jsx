import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Navbar,
  Container,
  Nav as Navigation,
  Form,
  FormControl,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="What are you craving?"
              className="mr-2 search"
              aria-label="Search"
            />
          </Form>
          <FontAwesomeIcon icon={faShoppingCart} className="navbar-margin" />
          <span>0</span>
          <Navigation className="me-auto">
            <Navigation.Link onClick={(e) => logout(e, dispatch)}>Sign Out</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
