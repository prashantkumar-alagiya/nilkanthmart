import React, { useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Button, Image, ListGroup} from 'react-bootstrap'
import Rating from '../Components/Rating';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { fetchProductDetails } from '../reducers/productDetailsSlice';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import {actions} from '../reducers/cartSlice';

const ProductScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, product, error}  =  useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(fetchProductDetails(params.id))
    }, [params.id,dispatch])


    const handleAddToCart = () => {
        dispatch(actions.addToCart({id: product._id,name:product.name,qty : 1,price:product.price,image: product.image,countInStock: product.countInStock}));
        navigate(`/cart/${params.id}`);
    }

  return (
    <>
    <Link  to = "/" className='btn btn-light'> Go Back</Link>
    {isLoading ? <Loader /> : error ? <Message variant= 'danger' >{error}</Message> : <>
        
        <Row>
            <Col md = {4}>
                <Image src={product.image} fluid alt={product.name}></Image>
            </Col>
            <Col md = {4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>{product.name}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: {product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value = {product.rating || 0} text = {`${product.numReviews || 0} Reviews`}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item className = "font-small">
                        <strong>Description</strong> : {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md = {4}>
                <Card>
                <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price
                            </Col>
                            <Col>
                                $ {product.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <Button type = "button" className = "btn-block btn" disabled = {product.countInStock > 0 ? false : true} onClick={handleAddToCart}>Add To cart</Button>
                </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    }
    </>
  )
}

export default ProductScreen