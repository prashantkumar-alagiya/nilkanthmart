import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { allOrders } from '../reducers/allOrdersSlice';

const AllOrdersScreen = () => {
    const {isLoading, orders, error} = useSelector((state) => state.allOrders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allOrders());
    }, [dispatch])
  return (
    <>
        <h2>All Orders</h2>
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table bordered striped hover responsive className='table-sm'> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                <td>{order.user._id}</td>
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
    </>
  )
}

export default AllOrdersScreen