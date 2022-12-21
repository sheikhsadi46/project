import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Account(props) {
  const { account } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state; 

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === account._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/accounts/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Account not found');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/account/${account.slug}`}>
        {/* <img src={account.image} className="card-img-top" alt={account.name} /> */}
      </Link>
      <Card.Body>
        <Link to={`/account/${account.slug}`}>
          <Card.Title>{account.name}</Card.Title>
        </Link>
        
        <Card.Text>Balance: {account.amount}TK</Card.Text>
        <Link to={`/account/${account.slug}`}><Button>DETAILS</Button></Link>
        {/* {account.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(account)}>Add to cart</Button>
        )} */}
      </Card.Body>
    </Card>
  );
}
export default Account;