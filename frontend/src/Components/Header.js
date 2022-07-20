import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {LinkContainer}  from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant = "dark" collapseOnSelect expand="sm">
        <Container>
            <LinkContainer to = "/" >
                <Navbar.Brand>Nilkanth Mart</Navbar.Brand>
            </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to = "/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
        </LinkContainer>
        <LinkContainer to = "/login">
            <Nav.Link ><i className='fas fa-user'></i>signIn</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header