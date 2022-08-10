import React, { useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import Product from '../Components/Product';
import { fetchProducts } from '../reducers/productListSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import ProductsCarousel from '../Components/ProductsCarousel';

const HomeScreen = () => {
  const {productList : products, isLoading, error, pages, page} =  useSelector((state) => state.products);
  const params  = useParams();
  const dispatch = useDispatch();

  useEffect( () =>{
    dispatch(fetchProducts({keyword: params.keyword || '', pageNumber: params.page || ''}));
  }, [dispatch, params.keyword,params.page])

  return (
    <>
      {<ProductsCarousel />}
      <h1 className='p-3'>Latest Products</h1>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :<>
        <Row>
          {products?.length === 0 ? <Message variant = 'info'>no product found</Message> : ''}
      {
        products?.map((product) => {
          return <Col sm =  {12} md = {6} lg = {4} xl = {3}><Product key = {product._id} product = {product} /></Col>;
        })
      }
          
        </Row>
        <Paginate page = {page} pages = {pages} keyword = {params.keyword && params.keyword} />
        </>
    }
    </>
  )
}

export default HomeScreen