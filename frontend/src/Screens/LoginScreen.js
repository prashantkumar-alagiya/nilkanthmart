import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button , Row, Col} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {userLogin} from '../reducers/userLoginSlice';
import { LinkContainer } from 'react-router-bootstrap';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const navigate = useNavigate();
    const {isLoading, userInfo, error} = user;


    const redirect = location?.search?.split('=')[1] || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,navigate, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submit ", email, " password ",password);
        if(email === '' || password === ''){
            return;
        }
        dispatch(userLogin({email,password}));
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {isLoading && <Loader />}
        {error && <Message variant = 'danger'>{error.msg}</Message>}
        <Form onSubmit={handleSubmit}>
            
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
            <Button style = {{marginTop: '1.5rem'}} className='py-3' type = 'submit' variant='primary'>Sign In</Button>
        </Form>
        <Row>
            <Col className='py-3'>
                New register ? <Link to ={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen