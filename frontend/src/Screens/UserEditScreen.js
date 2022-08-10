import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {userDetails} from '../reducers/userDetailsSlice';
import { userUpdate } from '../reducers/userUpdateSlice';
import { userUpdateactions } from '../reducers/userUpdateSlice';

const UserEditScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const userDetail = useSelector((state) => state.userDetails);
    const {isLoading: userUpdateLoading, error: userUpdateError, success: userUpdateSuccess} = useSelector((state) => state.userUpdate);
    const {isLoading, user, error} = userDetail;
    const id = params?.id;


    useEffect(() => {
        if(userUpdateSuccess){
            dispatch(userUpdateactions.resetUserUpdate());
            navigate('/admin/users');
        }
        else{
            if(!user?.name || user?._id !== id){
                dispatch(userDetails(id));
            }
            else{
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    },[user?.name, dispatch, user?._id, id, user?.email,user?.isAdmin, userUpdateSuccess, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name || email || isAdmin){
            dispatch(userUpdate({id, email, name, isAdmin}));
        }
        
    }
  return (
      <>
    <FormContainer>
        <Link to = '/admin/users'>Go Back</Link>
        <h1>User Edit</h1>
        {userUpdateLoading && <Loader />}
        {userUpdateError && <Message variant= 'danger'>{userUpdateError}</Message>}
        {isLoading && <Loader />}
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

            <Form.Group controlId='isAdmin'>
                <Form.Check
                    type = "checkbox"
                    label = 'isAdmin'
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    checked = {isAdmin}
                    value = {isAdmin}
                >
                </Form.Check>
            </Form.Group>

            <Button style = {{marginTop: '1.5rem'}} type = 'submit' variant='primary'>Update</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default UserEditScreen;