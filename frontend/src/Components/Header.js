import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {LinkContainer}  from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../reducers/userLoginSlice';
import { createOrderactions } from '../reducers/createOrder';
import { myOrderListactions } from '../reducers/myOrderListSlice';
import { orderDetailsactions } from '../reducers/orderDetailsSlice';
import { userDetailsactions } from '../reducers/userDetailsSlice';
import { userProfileactions } from '../reducers/userProfileUpdateSlice';
import { userRegisteractions } from '../reducers/userRegisterSlice';
import { userListactions } from '../reducers/usersListSlice';
import { useNavigate } from 'react-router-dom';
import SearchProduct from './SearchProducts';
import { createReviewactions } from '../reducers/createReviewSlice';

const Header = () => {
  const user = useSelector((state) => state.userLogin);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = user;
  return (
    <header>
        <Navbar bg="dark" variant = "dark" collapseOnSelect expand="sm">
        <Container>
            <LinkContainer to = "/" >
                <Navbar.Brand>Nilkanth Mart</Navbar.Brand>
            </LinkContainer>
            <SearchProduct />
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to = "/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title = {userInfo.name} id = 'username'>
            <LinkContainer to ='/profile'>
              <NavDropdown.Item>
                profile
              </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick = {() => {
              dispatch(actions.logout());
              dispatch(createOrderactions.resetCreatedOrder());
              dispatch(myOrderListactions.resetMyOrderlist());
              dispatch(orderDetailsactions.resetOrderDetails());
              dispatch(userDetailsactions.resetOrderDetails());
              dispatch(userProfileactions.resetUserProfile());
              dispatch(userRegisteractions.resetUserRegister());
              dispatch(userListactions.resetUserList());
              dispatch(createReviewactions.resetCreateReview());
              navigate('/login');
              }
            }>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
              <LinkContainer to = "/login">
                <Nav.Link ><i className='fas fa-user'></i>signIn</Nav.Link>
              </LinkContainer>
        )}

        {userInfo && userInfo.isAdmin && (
          <NavDropdown title = 'ADMIN' id = 'userlist'>
            <LinkContainer to ='/admin/users'>
              <NavDropdown.Item>
                users
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to ='/admin/products'>
              <NavDropdown.Item>
                products
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to ='/admin/orders'>
              <NavDropdown.Item>
                orders
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header