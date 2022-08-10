import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button , Row, Col} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {registerUser} from '../reducers/userRegisterSlice';

const UserRegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userRegister);
    const navigate = useNavigate();
    const {isLoading, userInfo, error} = user;


    const redirect = location?.search?.split('=')[1] || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,navigate, redirect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit ", email, " password ",password);
        if(password !== confirmPassword){
            setMessage('password do not match')
        }
        else{
            if(email === '' || password === '' || name === ''){
                return;
            }
            dispatch(registerUser({email,password, name}));
        }
    }
  return (
    <FormContainer>
        <h1>User Register</h1>
        {isLoading && <Loader />}
        {message && <Message variant = 'danger'>{message}</Message>}
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
            <Button style = {{marginTop: '1.5rem'}} type = 'submit' variant='primary'>Register</Button>
        </Form>
        <Row>
            <Col className='py-3'>
                Already Register ? <Link to ={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default UserRegisterScreen;