import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {Form,Button , Row, Col, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { userDetails } from '../reducers/userDetailsSlice';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userProfileUpdate } from '../reducers/userProfileUpdateSlice';
import { userProfileactions } from '../reducers/userProfileUpdateSlice';
import { myOrders } from '../reducers/myOrderListSlice';

const UserProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userDetails);
    const navigate = useNavigate();
    const {isLoading, user, error} = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const {success} = useSelector((state) => state.userProfile);

    const myOrderData = useSelector((state) => state.myOrders);
    const {isLoading : myOrdersLoading, orders, error: myOrderError} = myOrderData;

    useEffect(() => {
        if(!userInfo){
            navigate('/login');
        }
        else{
            if(!user?.name){
                dispatch(userDetails('profile'));
            }
            else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[userInfo,navigate,dispatch,user]);


    useEffect(() => {
        if(success){
            dispatch(userDetails('profile'))
            setTimeout(() => {
                dispatch(userProfileactions.setSuccessUpdate(false))
            },2000)
        }
    }, [success,dispatch]);

    useEffect(() => {
        dispatch(myOrders());
    },[dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('password do not match')
        }
        else{
            dispatch(userProfileUpdate({id:user.id, name,email,password}))
        }
    }
  return (
    <Row>
        <Col md = '3'>
        <h2>User Profile</h2>
        {isLoading && <Loader />}
        {message && <Message variant = 'danger'>{message}</Message>}
        {success && <Message variant = 'success'>Profile Successfully Updated</Message>}
        {error && <Message variant = 'danger'>{error}</Message>}
        <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId='name'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter name'
                    onChange={(e) => setName(e.target.value)}
                    value = {name}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control
                    type = "email"
                    placeholder='enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                    type = "password"
                    placeholder='enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirm password'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                    type = "password"
                    placeholder='re enter password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value = {confirmPassword}
                >
                </Form.Control>
            </Form.Group>
            <Button style = {{marginTop: '1.5rem'}} type = 'submit' variant='primary'>Update</Button>
        </Form>
        </Col>
        <Col md = '9'>
            <h2>Orders</h2>
            {myOrdersLoading ? <Loader /> : myOrderError ? <Message variant='danger'>{myOrderError}</Message> : (
                <Table bordered striped hover responsive className='table-sm'> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => {
                            return <tr key = {order._id}>
                                <td>{order._id.substring(0,8)}...</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (order.paidAt.substring(0,10)) : 
                                    <i className='fas fa-times' style = {{color:'red'}}></i>
                                }</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : 
                                    <i className='fas fa-times' style = {{color:'red'}}></i>
                                }</td>
                                <td>
                                    <LinkContainer to = {`/order/${order._id}`}>
                                        <Button variant = 'light'>details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default UserProfileScreen;