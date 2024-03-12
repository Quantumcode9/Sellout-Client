import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../api/cart';
import {Card, Button, Col, Row} from 'react-bootstrap';
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


    const [flippedId, setFlippedId] = useState(null);
    const handleFlip = (id) => {
      if (flippedId === id) {
        setFlippedId(null);
      } else {
        setFlippedId(id);
      }
    };




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

        <h2>Your Cart</h2>
        <hr/>
        <div className="cart-card-container"> 
        {[...cart, ...cart2].map(item => (
          <div key={item._id} className="card-flipper" onClick={() => handleFlip(item._id)}>
    <div className={`card-content ${flippedId === item._id ? 'card-flipping' : ''}`}>
      {/* Front */}
      <div className="card-face card-face-front">
      <h3 className="title-card" style={{ 
          display: '-webkit-box', 
          WebkitBoxOrient: 'vertical', 
          WebkitLineClamp: 2, 
          overflow: 'hidden' 
        }}>
        {item.name}
      </h3>
      <div style={{ 
          backgroundColor: 'white', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50%', 
          width: '100%', 
          marginTop: '33%',
        }}>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ maxHeight: '100%', maxWidth: '100%',}}/>
</div>
          <p className='price-cart-card' style={{ color: item.salePrice < item.regularPrice ? 'red' : 'white' }}>
          ${item.salePrice < item.regularPrice ? item.salePrice : item.regularPrice || item.price}
          </p>

        <div className="cart-card-buttons">
        {cart.includes(item) ? (
            //cart
          <Button as={Link} to={`/tvs/${item._id}`} variant="dark">Back To Item Page</Button>
        ) : (
          //cart2
          <Button as={Link} to={`/products/${item._id}`} variant="dark">Back To Item Page</Button>
        )}
        </div>
      </div>

      
      {/* Back */}
      <div className="card-face card-face-back">
        
        <h3 className="title-card" style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden'
        }}>
          {item.name}
        </h3>
        <div style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%', 
          width: '100%',
          marginTop: '33%',
        }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ maxHeight: '100%', maxWidth: '100%', }} />
      </div>
      
      <p className='price-cart-card' style={{ color: item.salePrice < item.regularPrice ? 'red' : 'white' }}>
          ${item.salePrice < item.regularPrice ? item.salePrice : item.regularPrice || item.price}
          </p>
        <div className="cart-card-buttons">
        {cart.includes(item) ? (
            // cart
          <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}>
            Remove From Cart
          </Button>  
        ) : (
          // cart2
          <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete2(item._id); }}>
            Remove From Cart
          </Button>
        )}
          </div>
       
      </div> 
    </div>
    
  </div>

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