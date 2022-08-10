import React, { useEffect } from 'react';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useSelector } from 'react-redux';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../reducers/productListSlice';
import { productDelete } from '../reducers/productDeleteSlice';
import { productDeleteactions } from '../reducers/productDeleteSlice';
import Paginate from '../Components/Paginate';

const ProductListScreen = () => {
    const {error, productList, isLoading,pages, page} = useSelector((state) => state.products);
    const {isLoading: deleteLoading ,success, error:deleteError} = useSelector((state) => state.productDelete);
    const {userInfo} = useSelector((state) => state.userLogin);
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(fetchProducts({keyword : '', pageNumber : params.page || 1}));
        }
        else{
            navigate('/login');
        }
    }, [dispatch, userInfo,navigate, params?.page]);

    useEffect(() => {
        if(success){
            dispatch(fetchProducts());
        }
    }, [success, dispatch])

    const handleDeleteProduct = (id) => {
        if(window.confirm('are you sure to delete')){
            dispatch(productDeleteactions.resetProductDeleteState());
            dispatch(productDelete(id));
        }
    }   

    const handleCreateProduct = () => {
        navigate('/admin/product/create');
    }

  return (
    <>
     {deleteLoading && <Loader />}
     {deleteError && <Message variant = 'danger'>{deleteError}</Message>}
       
        <Row className = 'align-items-center'>
            <Col><h1>Products</h1></Col>
            <Col className='text-right'>
                <Button className = 'my-3' onClick={handleCreateProduct}>
                    <i className='fas fa-plus'></i> create product
                </Button>
            </Col>
        </Row>
        {isLoading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : (
             <>
            <Table bordered striped hover responsive className='table-sm'> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productList?.map((product) => {
                    return <tr key = {product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to = {`/admin/product/${product._id}/edit`}>
                                <Button variant = 'light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                            </LinkContainer>
                            <Button variant = 'danger' className='btn-sm' onClick={() => handleDeleteProduct(product._id)}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
        <Paginate pages = {pages} page = {page} isAdmin = {userInfo?.isAdmin}/>
        </>
        )}
       
    </>
  )
}

export default ProductListScreen;