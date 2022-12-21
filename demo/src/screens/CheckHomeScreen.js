import { useEffect, useReducer } from 'react';//, useState
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Check from '../components/Check';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, checks: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function CheckHomeScreen() {
    //***fetch data from backend using 'axios'
    // const [checks, setChecks] = useState([]);
    const [{ loading, error, checks }, dispatch] = useReducer(logger(reducer), {
        checks: [],
        loading: true,
        error: '',
      }); 
  useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/checks');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
         //***fetch data from backend
    //   setChecks(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Checks</title>
      </Helmet>
      <h1>Checks</h1>
      <div className="checks">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {checks.map((check) => (
              <Col key={check.slug} sm={6} md={4} lg={3} className="mb-3">
                <Check check={check}></Check>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default CheckHomeScreen;