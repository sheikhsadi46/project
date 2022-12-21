import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Cardd(props) {
  const { cardd } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // const addToCartHandler = async (item) => {
  //   const existItem = cartItems.find((x) => x._id === cardd._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/cardds/${item._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert('Sorry. Cardd is out of stock');
  //     return;
  //   }
  //   ctxDispatch({
  //     type: 'CART_ADD_ITEM',
  //     payload: { ...item, quantity },
  //   });
  // };
  return (
    <Card>
      <Link to={`/cardd/${cardd.slug}`}>
        
      </Link>
      <Card.Body>
        <Link to={`/cardd/${cardd.slug}`}>
          <Card.Title>{cardd.name}</Card.Title>
        </Link>
        
        <Card.Text>{cardd.number}</Card.Text>
        <Link to={`/cardd/${cardd.slug}`}><Button>SELECT</Button></Link>
      </Card.Body>
    </Card>
  );
}
export default Cardd;