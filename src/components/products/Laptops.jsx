import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from "react-bootstrap";
import { getLaptopsDeals } from "../../api/product";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
            console.error(err);
            msgAlert({ message: messages.addProductFailure, variant: 'danger' });
          });
      };

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 375,
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
 
  <Card key={product.id} style={{ width: '18rem', height: '16rem', margin: '3rem', overflow: 'hidden' }}>
  <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '4.0rem', overflow: 'hidden',  fontSize: '1.1rem' }}>
    {product.name}
  </Card.Header>
  <Card.Img variant="top" src={product.image} className="card-img" style={{ maxHeight: '200px', maxWidth: '300px' }} />
  <Card.Body style={{ display: 'flex',  justifyContent: ' space-evenly', textAlign: 'center', whiteSpace: 'nowrap', height: '3rem' }}>
  <Card.Text style={{ textAlign: 'center', color: 'black', textDecoration: product.salePrice < product.regularPrice ? 'line-through' : 'none' }}>
    ${product.regularPrice}
  </Card.Text>
  {product.salePrice < product.regularPrice && 
    <Card.Text style={{ color: 'red'}}>
      ${product.salePrice}
    </Card.Text>
  }
</Card.Body>
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
        <Button variant="light" onClick={() => handleSubmit(product)}>View</Button>
    </Card.Footer>
    </Card>
    
  ))}
  </Slider>
 
    </Container>
    );
    }


export default Laptops;