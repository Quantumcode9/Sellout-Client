import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../api/cart';
import {Card, Button} from 'react-bootstrap';
import { handleDeleteFromCart } from '../../api/cart';
import { DeleteProductFromCart } from '../../api/cart';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Cart.scss';


const CartPage = ({ user }) => {
  const [cart, setCart] = useState([]);
  const [cart2, setCart2] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    getCartItems(user)
      .then(res => {
        setCart(res.data.cart);
        setCart2(res.data.cart2);
      })
      .catch(err => console.error(err));
  }, []);
  
    const handleDelete = (tvId) => {
      handleDeleteFromCart(tvId, user)
        .then(() => {
          setCart(cart.filter(item => item._id !== tvId));
        })
        .catch(err => {
          console.error(err);
        });
    };
    const handleDelete2 = (productId) => {
      DeleteProductFromCart(productId, user)
        .then(() => {
          setCart2(cart2.filter(item => item._id !== productId));
        })
        .catch(err => {
          console.error(err);
        
        });
    }

// Calculates total price of items in cart
    const totalPrice = [...cart, ...cart2].reduce((total, item) => {
      let price;
      if (item.price) {
        price = item.price;
      } else {
        price = item.salePrice < item.regularPrice ? item.salePrice : item.regularPrice;
      }
      return total + price;
    }, 0);
    // round to 2 decimal places
    const roundedTotalPrice = +totalPrice.toFixed(2);


  
    if (!user) {
      return <div>Loading...</div>;
    }
    return (
      
      <div className="cart-container">
      <div>
        <h2>Your Cart</h2>
        <hr/>
        {cart.map(item => (

  <Card key={item._id} className="cart-card">
  <div className="cart-img-container">
  <Card.Img variant="top" src={item.image} />
  </div>
  <Card.Body className="cart-card-body" >
  <Card.Text className='cart-title'>{item.name}</Card.Text>
    <Card.Text>
    Price: {`${item.price}.99`}
    </Card.Text>
  </Card.Body> 
  <div className="cart-card-buttons">
  <Button as={Link} to={`/tvs/${item._id}`} variant="dark">Back To Item Page</Button>
    {/* Delete From Cart */}
    <Button variant='' onClick={() => handleDelete(item._id)}>
      Remove From Cart
    </Button>
  </div>
</Card>


))}
{cart2.map(item => (
  <Card key={item._id} className="cart-card">
  <div className="cart-img-container">
  <Card.Img variant="top" src={item.image} />
  </div>
  <Card.Body className="cart-card-body">
  <Card.Text className='cart-title'>{item.name}</Card.Text>
  <Card.Text style={{ color: item.salePrice < item.regularPrice ? 'red' : 'white' }}>
  ${item.salePrice < item.regularPrice ? item.salePrice : item.regularPrice}
</Card.Text>
  </Card.Body>
  <div className="cart-card-buttons">
    
    <Button as={Link} to={`/products/${item._id}`} variant="dark">Back To Item Page</Button>
    {/* Delete From Cart */}
    <Button variant='' onClick={() => handleDelete2(item._id)}>
      Remove From Cart
    </Button>
    </div>
</Card>
))}


      </div>
      <div className="checkout">
      <h2>Total Price: ${roundedTotalPrice}</h2>
      <hr/>
      <Button variant="btn btn-lg btn-outline-success">Checkout</Button>
      </div>
      </div>
    );
  }
  
  export default CartPage;