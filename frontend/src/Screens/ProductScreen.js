import React, { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Button, Image, ListGroup, Form} from 'react-bootstrap'
import Rating from '../Components/Rating';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { fetchProductDetails } from '../reducers/productDetailsSlice';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import {actions} from '../reducers/cartSlice';
import { createReview, createReviewactions } from '../reducers/createReviewSlice';

const ProductScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const {isLoading, product, error}  =  useSelector((state) => state.productDetails);
    const {error: createReviewError, success}  =  useSelector((state) => state.createReview);
    const {userInfo} = useSelector((state) => state.userLogin);

    useEffect(() => {
        dispatch(fetchProductDetails(params.id));
    }, [params.id,dispatch])


    useEffect(() => {
        if(success){
            dispatch(fetchProductDetails(params.id));
            setRating(0);
            setComment('');
            dispatch(createReviewactions.resetCreateReview())
        }
    },[success, dispatch, params.id])


    const handleAddToCart = () => {
        dispatch(actions.addToCart({id: product._id,name:product.name,qty : 1,price:product.price,image: product.image,countInStock: product.countInStock}));
        navigate(`/cart/${params.id}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview({id: params.id,rating, comment}));
    }

  return (
    <>
    <Link  to = "/" className='btn btn-light'> Go Back</Link>
    {isLoading ? <Loader /> : error ? <Message variant= 'danger' >{error.msg}</Message> : <>
        
        <Row>
            <Col md = {4}>
                <Image src={product?.image} fluid alt={product?.name}></Image>
            </Col>
            <Col md = {4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>{product?.name}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: {product?.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value = {product?.rating || 0} text = {`${product?.numReviews || 0} Reviews`}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item className = "font-small">
                        <strong>Description</strong> : {product?.description}
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
                                $ {product?.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <Button type = "button" className = "btn-block btn" disabled = {product?.countInStock > 0 && userInfo ? false : true} onClick={handleAddToCart}>Add To cart</Button>
                </ListGroup>
                </Card>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col md = '6'>
            <h1 style = {{marginTop: '1rem'}}>Reviews</h1>
            <ListGroup>
                {product?.reviews?.length === 0 && <Message variant='info'>No Reviews</Message>}
                {product?.reviews?.map((review) => {
                    return <div key = {review.id}>
                        <strong>{review.name}</strong>
                        <Rating value = {review.review} text ='' />
                        <p>{review.comment}</p>
                        <p>{review.createdAt.substring(0,10)}</p>
                        <hr />
                    </div>
                })}
                <ListGroup.Item>
                    <h2>Write a Review</h2>
                    {createReviewError && <Message variant='danger'>{createReviewError.msg}</Message>}
                    {userInfo ? (
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group controlId = 'rating'>
                                <Form.Label>
                                    Rating
                                </Form.Label>
                                <Form.Control as = 'select' value = {rating} onChange = {(e) => setRating(+e.target.value)}>
                                    <option value = ''>select...</option>
                                    <option value = '1'>1-POOR</option>
                                    <option value = '2'>2-FAIR</option>
                                    <option value = '3'>3-GOOD</option>
                                    <option value = '4'>4-VERY GOOD</option>
                                    <option value = '5'>5-EXCELLENT</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId = 'comment'> 
                                <Form.Label>
                                    Comment
                                </Form.Label>
                                <Form.Control
                                as =  'textarea'
                                value = {comment}
                                onChange={(e) => setComment(e.target.value)}
                                >
                                    
                                </Form.Control>
                            </Form.Group>
                            <Button style = {{marginTop:'1.5rem'}} type = 'submit' variant = 'primary'>Add Review</Button>
                        </Form>
                    ) : (<Message>please <Link to = '/login'>sign in</Link> to write review</Message>)}
                </ListGroup.Item>
            </ListGroup>
            </Col>
        </Row>
    </>
    }
    </>
  )
}

export default ProductScreen