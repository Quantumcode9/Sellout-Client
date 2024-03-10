import React, { useState, useEffect } from 'react';
import { searchProducts, createProduct } from '../../api/product';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const Search = () => {
    const [keyword, setKeyword] = useState(''); 
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({});

    const handleSearch = (event) => {
        event.preventDefault();
        searchProducts(keyword)
        .then((response) => {
            console.log('This came through', response.data.products);
            setProducts(response.data.products); 
        })
        .catch((error) => {
            console.error('Failed to search products:', error);
        });
    };

const navigate = useNavigate();


const handleInputChange = (event) => {
  setProductData({
        ...productData,
        [event.target.name]: event.target.value
      });
};
  
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
            console.error('Error creating product:', err);
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
<div>
  <div>
  <Form onSubmit={handleSearch}>
    <Form.Group controlId="searchKeyword" style={{ width: '60%', margin: 'auto', marginTop: '20px' }}>
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for products..."
      />
    </Form.Group>
    <Button variant="dark" type="submit">
      Search
    </Button>
  </Form>
  </div>


  <div>

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
      </Card.Footer>
    </Card>
  ))}
</Slider>
  </div>
</div>
    );
};

export default Search;
