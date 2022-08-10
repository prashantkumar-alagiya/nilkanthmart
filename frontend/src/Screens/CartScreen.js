import React from 'react';
import { Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import {actions} from '../reducers/cartSlice';

const CartScreen = () => {
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.userLogin);

    const handleCheckout = () => {
        navigate('/shipping');
    }

  return (
      <div className='cart-screen'>
    <Row>
        <Col md = "8" >
        <h1>Cart Screen</h1>
        {cartItems?.length === 0 ? <Message><>your cart is empty <Link to = '/'>go back</Link></></Message> : (
            <ListGroup>
                {cartItems?.map((item) => {
                    return  <ListGroup.Item key = {item.id}>
                        <Row>
                            <Col md = "2">
                                <Image src = {item.image} alt = {item.name} fluid rounded/>
                            </Col>
                            <Col md = "3">
                                <Link to = {`/products/${item.id}`}>{item.name}</Link>
                            </Col>
                            <Col md = "2">
                                {item.price} $
                            </Col>
                            <Col className = 'cart-update' md = "3">
                                <Row>
                                    <Col>
                                        <Button type = "button" className = 'btn-padding-small' disabled = {item.qty === item.countInStock ? true : false} onClick={() => {dispatch(actions.updateQuantity({id: item.id, operation : 'INCREMENT'}))}}><span style = {{fontSize: '1.2rem'}}>+</span></Button>
                                    </Col>
                                    <Col>
                                        <span style = {{fontSize: '1rem',margin: '1rem 1rem 1rem', display: 'inline-block', textOverflow: 'ellipsis',textAlign : 'center'}}>{item.qty}</span>
                                    </Col>
                                    <Col>
                                    <Button type = "button" className = 'btn-padding-small' disabled = {item.qty === 1 ? true : false} onClick={() => {dispatch(actions.updateQuantity({id: item.id, operation : 'DECREMENT'}))}}><span style = {{fontSize: '1.2rem'}}>-</span></Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md = "2">
                                <Button type = 'button' variant='light' onClick={() => {dispatch(actions.removeFromCart(item.id))}}><i className='fas fa-trash'></i></Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                })}
            </ListGroup>
        )}
        </Col>
        <Col md = "4">
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>SUBTOTAL ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) Items</h2>
                            $ {cartItems?.reduce((acc,item) => (acc + (item.qty * item.price)), 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <button type = 'button' variant = 'light' className = 'btn-block' disabled = {userInfo &&  cartItems?.length > 0 ? false : true} onClick={handleCheckout}>Proceed to checkout </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
        </Col>
    </Row>
    </div>
  )
}

export default CartScreen;