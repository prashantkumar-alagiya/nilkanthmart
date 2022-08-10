import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchProductDetails } from '../reducers/productDetailsSlice';
import { updateProduct, updateProductactions } from '../reducers/updateProductSlice';

const ProductEditScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const params = useParams();
    const id = params?.id;
    const {isLoading: productDetailsLoading, product, error: productDetailsError}  = useSelector((state) => state.productDetails);
    const {isLoading, error, success}  = useSelector((state) => state.productUpdate);

    useEffect(() => {
        if(success){
            dispatch(fetchProductDetails(id));
        }
        
    }, [success,dispatch, id]);

    useEffect(() => {
        console.log("useEffect called ", " id ", id,  " product ", product);
        if(!product?._id || product._id !== id){
            dispatch(fetchProductDetails(id));
        }
        else{
            setName(product.name);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setDescription(product.description);
            setCountInStock(product.countInStock);
            setImage(product.image);
        }
    },[dispatch, id, product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProductactions.resetProductUpdate());
        dispatch(updateProduct({id,name, price, image, description, countInStock, brand, category}));
    }
  return (
      <>
    <FormContainer>
        <Link to = '/admin/products'>Go Back</Link>
        <h1>Product Edit</h1>
        {productDetailsLoading &&  <Loader />}
        {productDetailsError &&  <Message variant= 'danger'>{productDetailsError}</Message>}
        {isLoading &&  <Loader />}
        {error &&  <Message variant= 'danger'>{error}</Message>}
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
            <Form.Group controlId='price'>
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control
                    type = "number"
                    placeholder='enter price'
                    onChange={(e) => setPrice(e.target.value)}
                    value = {price}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>
                    Image URL
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter image URL'
                    onChange={(e) => setImage(e.target.value)}
                    value = {image}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter description'
                    onChange={(e) => setDescription(e.target.value)}
                    value = {description}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='countin stock'>
                <Form.Label>
                    Count In Stock
                </Form.Label>
                <Form.Control
                    type = "number"
                    placeholder='enter stock count'
                    onChange={(e) => setCountInStock(e.target.value)}
                    value = {countInStock}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>
                    Category
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter category'
                    onChange={(e) => setCategory(e.target.value)}
                    value = {category}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
                <Form.Label>
                    Brand
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter brand'
                    onChange={(e) => setBrand(e.target.value)}
                    value = {brand}
                >
                </Form.Control>
            </Form.Group>

            <Button style = {{marginTop: '1.5rem'}} type = 'submit' variant='primary'>Update</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default ProductEditScreen;