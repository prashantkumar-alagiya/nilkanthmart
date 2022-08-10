import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { createProduct, createProductactions } from '../reducers/productCreateSlice';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, error, success}  = useSelector((state) => state.productCreate);
    const {userInfo} = useSelector((state) => state.userLogin);

    useEffect(() => {
        if(success){
            dispatch(createProductactions.resetProductCreate())
            navigate('/admin/products');
        }
        
    }, [success,dispatch, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct({name, price, image, description, countInStock, brand, category, user : userInfo?.id}));
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        setIsUploading(true);
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }

        try{
            const {data} = await axios.post('/api/upload',formData, config);
            setIsUploading(false);
            setImage(data);
        }
        catch(e){
            console.log("error is ",error);
        }
    }

  return (
      <>
    <FormContainer>
        <Link to = '/admin/products'>Go Back</Link>
        <h1>Create Product </h1>
        { isLoading && <Loader />}
        { error && <Message variant= 'danger'>{error}</Message>}
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
                <Form.Control
                    type = 'file'
                    id = 'image-file'
                    custom
                    label = 'choose file'
                    onChange= {handleImageUpload}
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

            <Form.Group controlId='countinstock'>
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

            <Button style = {{marginTop: '1.5rem'}} type = 'submit' variant='primary'>Create</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default CreateProductScreen;