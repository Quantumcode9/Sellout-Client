import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from "react-bootstrap";
import { getLaptopsDeals } from "../../api/product";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { addToCart } from '../../api/cart';
import messages from '../shared/AutoDismissAlert/messages';
import { createProduct } from '../../api/product';


const Laptops = (props) => {

    const [products, setProducts] = useState([]);
    const { laptops, msgAlert,  } = props;
    const { user } = props;


    useEffect(() => {
        getLaptopsDeals()
            .then(response => setProducts(response.data.products))
            .catch(error => console.error(error));
    }
        , []);

    const navigate = useNavigate();

    const handleAddToCart = (laptopId) => {
        addToCart(user, laptopId)
            .then(() => {
                msgAlert({
                    heading: 'Laptop Added to Cart',
                    message: messages.addToCartSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Laptop Add to Cart Failed',
                    message: messages.addToCartFailure,
                    variant: 'danger'
                })
            })
    }

    const handleSubmit = (productData) => {
        createProduct(productData)
          .then(res => {
            const id = res.data.product._id; 
            if(id) {
              navigate(`/products/${id}`);
            } else {
              console.error("Product ID is undefined.", res.data);
            }
          })
          .catch(err => {
            // handle error
          });
      };

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          }
        ]
      };


    
    return (
        <Container>
        <h1>Laptop Deals</h1>
        <Slider {...settings}>
  {products.map(product => (
  <Card key={product.id} style={{ width: '18rem', height: '18rem', margin: '2rem', overflow: 'hidden' }}>
  <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {product.name}
  </Card.Header>
  <Card.Img variant="top" src={product.image} className="card-img" />
  <Card.Body style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', height: '5rem' }}>
  <Card.Text style={{ color: 'black', textDecoration: product.salePrice < product.regularPrice ? 'line-through' : 'none' }}>
    ${product.regularPrice}
  </Card.Text>
  {product.salePrice < product.regularPrice && <Card.Text style={{ color: 'red', overflow: 'hidden',marginLeft: '10px' }}> ${product.salePrice}</Card.Text>}
</Card.Body>
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
        <Button variant="primary" onClick={() => handleSubmit(product)}>View</Button>

        <Button variant="dark" onClick={() => handleAddToCart(product.id)}>
          Add to Cart 
        </Button>
      </Card.Footer>
    </Card>
  ))}
</Slider>
        </Container>
    );
    }


export default Laptops;