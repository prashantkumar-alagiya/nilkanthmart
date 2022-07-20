import React, { useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Product from '../Components/Product';
import { fetchProducts } from '../reducers/productListSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const HomeScreen = () => {
  const {productList : products, isLoading, error} =  useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect( () =>{
    dispatch(fetchProducts());
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :<>
        <Row>
          
      {
        products.map((product) => {
          return <Col sm =  {12} md = {6} lg = {4} xl = {3}><Product key = {product._id} product = {product} /></Col>;
        })
      }
          
        </Row>
        </>
    }
    </>
  )
}

export default HomeScreen