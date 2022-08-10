import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actions } from '../reducers/cartSlice';
import CheckoutSteps from '../Components/CheckoutSteps';

const ShippingScreen = () => {
    const shippingAddress = useSelector((state) => state?.cart?.shippingAddress);
    const [address,setAddress]  = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] =  useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = () => {
        dispatch(actions.saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId='name'>
                <Form.Label>
                    Address
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter Adsress'
                    onChange={(e) => setAddress(e.target.value)}
                    value = {address}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>
                    City
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter city'
                    onChange={(e) => setCity(e.target.value)}
                    value = {city}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label>
                    Postal Code
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter postal code'
                    onChange={(e) => setPostalCode(e.target.value)}
                    value = {postalCode}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>
                    Country
                </Form.Label>
                <Form.Control
                    type = "text"
                    placeholder='enter country'
                    onChange={(e) => setCountry(e.target.value)}
                    value = {country}
                >
                </Form.Control>
            </Form.Group>
            <Button style = {{marginTop: '1.5rem'}} type= 'submit' variant = 'primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>

  )
}

export default ShippingScreen