import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
// import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, cardd: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CarddScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, cardd }, dispatch] = useReducer(reducer, {
    cardd: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/cardds/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === cardd._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cardds/${cardd._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Cardd is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...cardd, quantity },
    });
    navigate('/cart'); //**************************************************navigate to cart screen click on add to cart */
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>  
        <Col md={3}>
          {/* <img
            className="img-large"
            src={cardd.image}
            alt={cardd.name}
          ></img> */}
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{cardd.name}</title>
              </Helmet>
              <h1>{cardd.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* <Rating
                rating={cardd.rating}
                numReviews={cardd.numReviews}
              ></Rating> */}
            </ListGroup.Item>
            <ListGroup.Item>Amount : {cardd.amount}TK</ListGroup.Item>
            <ListGroup.Item>Catagory : {cardd.category}</ListGroup.Item>
            <ListGroup.Item>
              Description: {cardd.description}</ListGroup.Item>
              
            

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Balance:</Col>
                    <Col>{cardd.amount}</Col>
                  </Row>
                  <Row>
                    <Col>Available</Col>
                    
                    <Col></Col>
                    </Row>
                    <Row>
                    <Col>Balance:</Col>
                    <Col>{cardd.amount}</Col>
                  
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {cardd.active > 0 ? (
                        <Badge bg="success">Available</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {cardd.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                    <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CarddScreen;