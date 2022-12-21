import { useEffect, useReducer } from 'react';//, useState
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Account from '../components/Account';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, accounts: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function HomeScreen() {
    //***fetch data from backend using 'axios'
    // const [accounts, setAccounts] = useState([]);
    const [{ loading, error, accounts }, dispatch] = useReducer(logger(reducer), {
        accounts: [],
        loading: true,
        error: '',
      }); 
  useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/accounts');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
         //***fetch data from backend
    //   setAccounts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>DEMO Bank</title>
      </Helmet>
      <h1>Accounts</h1>
      <div className="accounts">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {accounts.map((account) => (
              <Col key={account.slug} sm={6} md={4} lg={3} className="mb-3">
                <Account account={account}></Account>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;