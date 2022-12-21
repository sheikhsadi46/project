import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Check(props) {
  const { check } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // const addToCartHandler = async (item) => {
  //   const existItem = cartItems.find((x) => x._id === check._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/checks/${item._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert('Sorry. Check is out of stock');
  //     return;
  //   }
  //   ctxDispatch({
  //     type: 'CART_ADD_ITEM',
  //     payload: { ...item, quantity },
  //   });
  // };
  return (
    <Card>
      <Link to={`/check/${check.slug}`}>
        
      </Link>
      <Card.Body>
        <Link to={`/check/${check.slug}`}>
          <Card.Title>{check.name}</Card.Title>
        </Link>
        
        <Card.Text>{check.number}</Card.Text>
        <Link to={`/check/${check.slug}`}><Button>SELECT</Button></Link>
      </Card.Body>
    </Card>
  );
}
export default Check;