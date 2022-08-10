import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button,Col, Row, ListGroup, Card, Image} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {orderDetails} from '../reducers/orderDetailsSlice.js';
import Loader from '../Components/Loader';
import Message from '../Components/Message.js';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import {payOrder}from '../reducers/orderPaySlice';
import { actions } from '../reducers/orderPaySlice';
import { deliverOrder, orderDeliveractions } from '../reducers/orderDeliverSlice.js';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const {order, isLoading, error} = useSelector((state) => state?.orderDetails);
    const params = useParams();
    const [sdkReady, setSdkReady] = useState(false);
    const {isLoading: loadingPay,success: successPay,error: payError} = useSelector((state) => state?.orderPayment);
    const {isLoading: loadingDeliver,success: successDeliver ,error: deliverError} = useSelector((state) => state?.deliverOrder);
    const {userInfo} = useSelector((state) => state.userLogin);

    useEffect(() => {
        if( order?._id !== params.id || successPay){
            dispatch(actions.orderPaymentReset());
            dispatch(orderDetails(params.id));
            
        }
        
    }, [params.id, order?._id,dispatch, successPay]);

    useEffect(() => {
        if(successDeliver){
            dispatch(orderDetails(params.id));   
        }
    }, [dispatch,successDeliver, params.id])

    useEffect(() => {
        const addScript = async () => {
            try{
                const {data: clientId} = await axios.get('/api/config/paypal');
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
                script.onload = () => {
                    setSdkReady(true);
                }
                script.async = true;
                document.body.appendChild(script);
            }
            catch(e){

            }
        }
        addScript();
    }, []);

    const  handlePaymentSuccess = (paymentResult) => {
        dispatch(payOrder({id: order._id, paymentResult}));
    }

    const handleOrderDeliver = () => {
        dispatch(orderDeliveractions.orderDeliverReset());
        dispatch(deliverOrder(params?.id));
    }
    
    
  return (
      <>
    {isLoading ? <Loader /> : error ? <Message variant = 'danger' >{error}</Message> : (
        <>
        <h1>Order: {order?._id}</h1>
        <Row>
            <Col md = '8'>
                <ListGroup>
                    <ListGroup.Item>
                        Name: {order?.user?.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                       Email: <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Address :</h2>
                        <p><strong>{order?.shippingAddress?.address}, </strong> 
                        <strong>{order?.shippingAddress?.city}, </strong>
                        <strong>{order?.shippingAddress?.postalCode}, </strong>
                        <strong>{order?.shippingAddress?.country}</strong></p>
                        {order?.isDelivered ? 
                         <Message variant= 'success'>Deliverd on {order?.deliveredAt}</Message> : 
                         <Message variant= 'danger'>Not Deliverd</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: {order?.paymentMethod}</strong>
                        {order?.isPaid ? 
                         <Message variant= 'success'>paid on {order?.paidAt}</Message> : 
                         <Message variant= 'danger'>Not paid</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {
                            order?.orderItems?.length === 0 ? ('your shopping cart is empty') : (
                                <ListGroup className='orderlist'>
                                    {order?.orderItems?.map((item) => {
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
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price)?.toFixed(2)}
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
                                <Col>${(order && (order?.totalPrice - order?.shippingPrice - order?.taxPrice))?.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${(order.shippingPrice)?.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${(order.taxPrice)?.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>total</Col>
                                <Col>${(order.totalPrice)?.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount = {`${order.totalPrice}`} onSuccess = {handlePaymentSuccess} />
                                )}
                            </ListGroup.Item>
                        )
                        }

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                {loadingDeliver && <Loader />}
                                {deliverError && <Message> {deliverError}</Message>}
                                <Button type = 'button' onClick={handleOrderDeliver}>Mark As Deliver</Button>
                            </ListGroup.Item>
                        )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    )
    }
    </>
  )                 
}

export default OrderScreen;