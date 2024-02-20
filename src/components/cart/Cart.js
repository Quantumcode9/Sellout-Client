import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../api/cart';
import {Card, Button} from 'react-bootstrap';
import { handleDeleteFromCart } from '../../api/cart';
import './Cart.scss';


const CartPage = ({ user }) => {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      getCartItems(user)
        .then(res => setCartItems(res.data.cart))
        .catch(err => console.error(err));
    }, []);
  
    const handleDelete = (tvId) => {
      handleDeleteFromCart(tvId, user)
        .then(() => {
          setCartItems(cartItems.filter(item => item._id !== tvId));
        })
        .catch(err => {
        //add message later
        });
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
    if (!user) {
      return <div>Loading...</div>;
    }
    return (
      
      <div className="cart-container">
      <div>
        <h2>Your Cart</h2>
        <hr/>
        {cartItems.map(item => (
  <Card key={item._id} className="cart-card">
  <Card.Img variant="top" src={item.image} />
  <Card.Body className="cart-card-body" style= {{ backgroundColor: 'black', color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
    <Card.Title>{item.name}</Card.Title>
    <Card.Text>
      Price: {item.price}
    </Card.Text>
  </Card.Body> 
  <div className="cart-card-buttons">
    <Button variant="">Item page</Button>
    {/* Delete From Cart */}
    <Button variant='' onClick={() => handleDelete(item._id)}>
      Remove From Cart
    </Button>
  </div>
</Card>
))}
     
      </div>
      <div className="checkout">
      <h2>Total Price: ${totalPrice}</h2>
      <hr/>
      <Button variant="btn btn-lg btn-outline-success">Checkout</Button>
      </div>
      </div>
    );
  }
  
  export default CartPage;