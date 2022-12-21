import { useEffect, useReducer } from 'react';//, useState
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cardd from '../components/Cardd';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, cardds: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function CarddHomeScreen() {
    //***fetch data from backend using 'axios'
    // const [cardds, setCardds] = useState([]);
    const [{ loading, error, cardds }, dispatch] = useReducer(logger(reducer), {
        cardds: [],
        loading: true,
        error: '',
      }); 
  useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/cardds');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
         //***fetch data from backend
    //   setCardds(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Cards</title>
      </Helmet>
      <h1>Cards</h1>
      <div className="cardds">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {cardds.map((cardd) => (
              <Col key={cardd.slug} sm={6} md={4} lg={3} className="mb-3">
                <Cardd cardd={cardd}></Cardd>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default CarddHomeScreen;