import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { paymentAddress },
  } = state;
  const [amont, setFullName] = useState(paymentAddress.amont || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/payment');
    }
  }, [userInfo, navigate]);
 
  const submitHandler = (e) => { 
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        amont,
        
      },
    });
    localStorage.setItem(
      'paymentAddress',
      JSON.stringify({
        amont,
        
      })
    );
    navigate('/Confirmation');
  };
  return (
    <div>
      <Helmet>
        <title>Payment Address</title>
      </Helmet>

      <CheckoutSteps step1></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Payment Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="amont">
            <Form.Label>Amount</Form.Label>
            <Form.Control
            type="number"
              value={amont}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}