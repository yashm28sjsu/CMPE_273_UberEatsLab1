import React from 'react';
import {
  Navbar,
  Container,
  Nav as Navigation,
  NavDropdown,
} from 'react-bootstrap';

const Nav = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Sober-Eats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navigation className="me-auto">
          <Navigation.Link href="#home">Home</Navigation.Link>
          <Navigation.Link href="#link">Link</Navigation.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Navigation>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Nav;
