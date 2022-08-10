import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button,Col, Row, ListGroup, Card, Image} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Link } from 'react-router-dom';
import {createOrder} from '../reducers/createOrder';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const {shippingAddress, paymentMethod, cartItems} = useSelector((state) => state?.cart);
    const {order, success} = useSelector((state) => state?.createOrder)
    const navigate = useNavigate();

    useEffect(() => {
        if(success){
            navigate(`/order/${order?._id}`);
        }
    }, [success, order?._id,navigate])
    let itemsPrice, shippingPrice, taxPrice, totalPrice;
    itemsPrice = cartItems.reduce((acc, item) => {
        return acc + (item.qty * item.price);
    },0);

    itemsPrice = Number(itemsPrice.toFixed(2));
    shippingPrice = itemsPrice > 500 ? 0.00 : 100;
    shippingPrice = Number(shippingPrice.toFixed(2));
    taxPrice = Number((itemsPrice * 0.15).toFixed(2));
    totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const handlePlaceOrder = () => {
        dispatch(createOrder({shippingAddress, paymentMethod, cartItems,itemsPrice, shippingPrice, taxPrice, totalPrice}));
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4>
        </CheckoutSteps>
        <Row>
            <Col md = '8'>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Address :</h2>
                        <p><strong>{shippingAddress.address}</strong></p>
                        <p><strong>{shippingAddress.city}</strong></p>
                        <p><strong>{shippingAddress.postalCode}</strong></p>
                        <p><strong>{shippingAddress.country}</strong></p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: {paymentMethod}</strong>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {
                            cartItems.length === 0 ? ('your shopping cart is empty') : (
                                <ListGroup className='orderlist'>
                                    {cartItems.map((item) => {
                                        return (
                                            <ListGroup.Item key = {item.id}>
                                                <Row>
                                                    <Col md = '1'>
                                                        <Image alt = {item.name} src = {item.image} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to = {`/products/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md = '5'>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md = '4'>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>total</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type = 'button' disabled = {cartItems.length === 0} class = "btn-block" onClick={handlePlaceOrder}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen