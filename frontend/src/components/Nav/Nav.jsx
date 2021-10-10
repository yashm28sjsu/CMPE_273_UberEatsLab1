import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav as Navigation,
  Form,
  FormControl,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import userActions from '../../actions/user';
import './Nav.css';
import CartModal from './CartModal';

const logout = (e, dispatch) => {
  window.localStorage.setItem('token', {});
  dispatch(userActions.getLogoutAction());
};

const Nav = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishes);
  const [redirectProfile, setRedirectProfile] = useState(false);
  const [show, setShow] = useState(false);

  const redirect = redirectProfile ? <Redirect to="/user/profile" /> : '';

  return (
    <Navbar expand="lg">
      {redirect}
      <Container>
        <Navbar.Brand className="ubertitle">
          <Link to="/feed" style={{ textDecoration: 'none' }}>
            <span className="uberblack">Sober</span>
            {' '}
            <span className="ubergreen">Eats</span>
          </Link>
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
          <FontAwesomeIcon icon={faShoppingCart} className="navbar-margin" onClick={(_e) => setShow(true)} />
          <span>{dishes.dishes.length}</span>
          <FontAwesomeIcon icon={faUser} className="navbar-margin" onClick={(_e) => setRedirectProfile(true)} />
          <Navigation className="me-auto">
            <Navigation.Link onClick={(e) => logout(e, dispatch)}>Sign Out</Navigation.Link>
          </Navigation>
        </Navbar.Collapse>
      </Container>
      <CartModal show={show} setShow={setShow} />
    </Navbar>
  );
};

export default Nav;
