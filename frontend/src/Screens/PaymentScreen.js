import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actions } from '../reducers/cartSlice';
import CheckoutSteps from '../Components/CheckoutSteps';

const PaymentScreen = () => {
    const shippingAddress = useSelector((state) => state?.cart?.shippingAddress);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    if(!shippingAddress){
        navigate('/shipping');
    }
    

    const handleSubmit = () => {
        dispatch(actions.savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
            
            <Form.Group>
                <Form.Label as = 'legend'>Select Method</Form.Label>
               
                <Col>
                    <Form.Check
                    id = 'paypal'
                    label = 'Paypal or credit card'
                    name = 'paymentMethod'
                    value = {paymentMethod}
                    checked
                    type = 'radio'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col> 
            </Form.Group>
            <Button style = {{marginTop: '1.5rem'}} type= 'submit' variant = 'primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>

  )
}

export default PaymentScreen