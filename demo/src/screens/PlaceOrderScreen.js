import Axios from 'axios';
import React, { useContext,  useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo ,tdx} = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23 {cart.paymentAddress.amont}
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.paymentPrice = cart.paymentAddress.amont > 100 ? round2(0) : round2(10);
  cart.taxPrice = 0.15 * cart.paymentAddress.amont;
  cart.totalPrice = (cart.paymentAddress.amont)-(-(cart.taxPrice));
    
  
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          paymentAddress: cart.paymentAddress,
          paymentMethod: 'Instant',
          itemsPrice: cart.paymentAddress.amont,
          paymentPrice: cart.paymentPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  // useEffect(() => {
  //   if (!cart.paymentMethod) {
  //     navigate('/payment');
  //   }
  // }, [cart, navigate]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Payment</title>
      </Helmet>
      <h1 className="my-3">Preview Payment</h1>
      <Row>
        <Col md={8}>
        <Card className="mb-3">
            <Card.Body>
              <Card.Title>Beneficiary Account</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                      <strong>Name:</strong> {item.name}<br />
                      <strong>Bank: </strong>{item.brand}<br />
                      <strong>Type: </strong>{item.category}<br />
                      <strong>Description: </strong>{item.description}<br />
                      
                        
                      </Col>
                      
                    </Row>
                  </ListGroup.Item>
                ))}
                {/* {account.amount} */}
              </ListGroup>

            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> Instant
                {tdx.tdxItems.map((item1) => (
                  <ListGroup.Item key={item1._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                      <strong>Name:</strong> {item1.amount}<br />
                      {/* <strong>Bank: </strong>{item.brand}<br />
                      <strong>Type: </strong>{item.category}<br /> */}
                      <strong>Description: </strong>{item1.description}<br />
                      
                        
                      </Col>
                      
                    </Row>
                  </ListGroup.Item>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Transaction Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Amount</Col>
                    <Col>${cart.paymentAddress.amont}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Total Amount</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Confirm Payment
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}