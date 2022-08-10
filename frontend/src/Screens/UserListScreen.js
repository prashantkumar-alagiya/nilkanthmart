import React, { useEffect } from 'react';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { usersList } from '../reducers/usersListSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDelete } from '../reducers/userDeleteSlice';

const UserListScreen = () => {
    const {error, users, isLoading} = useSelector((state) => state.userList);
    const {userInfo} = useSelector((state) => state.userLogin);
    const {success: userDeleteSuccess} = useSelector((state) => state.userDelete);
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(usersList());
        }
        else{
            navigate('/login');
        }
    }, [dispatch, userInfo,navigate,userDeleteSuccess]);

    const handleDeleteUser = (id) => {
        if(window.confirm('are you sure to delete')){
            dispatch(userDelete(id));
        }
    }   

  return (
    <>
        <h1>Users</h1>
        {isLoading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : (
            <Table bordered striped hover responsive className='table-sm'> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user) => {
                    return <tr key = {user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href = {`mailto:${user.email}`}>{user.email}</a></td>
                        <td>{user.isAdmin ? (<i className='fas fa-check' style = {{color:'green'}}></i>) : 
                        (<i className='fas fa-times' style = {{color:'red'}}></i>)}</td>
                        <td>
                            <LinkContainer to = {`/admin/user/${user._id}/edit`}>
                                <Button variant = 'light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                            </LinkContainer>
                            <Button variant = 'danger' className='btn-sm' onClick={() => handleDeleteUser(user._id)}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
        )}
    </>
  )
}

export default UserListScreen