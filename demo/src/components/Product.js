import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        
        <Card.Text>Number: {product.price}</Card.Text>
        <Link to={`/product/${product.slug}`}><Button>SELECT</Button></Link>
      </Card.Body>
    </Card>
  );
}
export default Product;