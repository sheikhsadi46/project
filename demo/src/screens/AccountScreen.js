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
      return { ...state, account: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AccountScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, account }, dispatch] = useReducer(reducer, {
    account: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/accounts/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { tdx } = state;
  const addToTdxHandler = async () => {
    const existItem1 = tdx.tdxItems.find((x) => x._id === account._id);
    const quantity = existItem1 ? existItem1.quantity + 0 : 1;
    const { data } = await axios.get(`/api/accounts/${account._id}`);
    
    ctxDispatch({
      type: 'TDX_ADD_TDX',
      payload: { ...account, quantity },
    });
    navigate('/'); //**************************************************navigate to tdx screen click on add to tdx */
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
            src={account.image}
            alt={account.name}
          ></img> */}
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{account.name}</title>
              </Helmet>
              <h1>{account.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* <Rating
                rating={account.rating}
                numReviews={account.numReviews}
              ></Rating> */}
            </ListGroup.Item>
            <ListGroup.Item>Amount : {account.amount}TK</ListGroup.Item>
            <ListGroup.Item>Branch : </ListGroup.Item>
            <ListGroup.Item>Nominee : </ListGroup.Item>
            <ListGroup.Item>
              Description: {account.description}</ListGroup.Item>
              
            

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Balance:</Col>
                    <Col>{account.amount}</Col>
                  </Row>
                  <Row>
                    <Col>Available</Col>
                    
                    <Col></Col>
                    </Row>
                    <Row>
                    <Col>Balance:</Col>
                    <Col>{account.amount}</Col>
                  
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {account.amount > 0 ? (
                        <Badge bg="success">Available</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {account.amount > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                    <Button onClick={addToTdxHandler} variant="primary">
                        Select
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

export default AccountScreen;