import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../api/product';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { response } from 'express';







const Search = () => {
    const [keyword, setKeyword] = useState(''); 
    const [products, setProducts] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        searchProducts(keyword)
        .then((response) => {
            console.log('All this crap came through', response.data.products);
            setProducts(response.data.products); 
        })
        .catch((error) => {
            console.error('Failed to search products:', error);
        });
    };

    const navigate = useNavigate();

    const handleViewClick = (productId) => {
      axios.get(`/api/products/${productId}`)
        .then(response => {
          if (response.status === 404) {
            const product = products.find(product => product.id === productId);
            axios.post('/api/products', { product })
              .then(() => {
                navigate(`/products/${productId}`);
              })
              .catch(error => {
                console.error('Failed to create product:', error);
              });
          } else {
            
            navigate(`/products/${productId}`);
          }
        })
        .catch(error => {
          console.error('Failed to get product:', error);
        });
    };


    return (
        <div>
          <div>
  <Form onSubmit={handleSearch}>
    <Form.Group controlId="searchKeyword" style={{ width: '50%', margin: 'auto' }}>
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
      />
    </Form.Group>
    <Button variant="dark" type="submit">
      Search
    </Button>
  </Form>
</div>

          
<Carousel>
  {products.map((product, index) => (
    <Carousel.Item key={index}>
      <Card style={{ transform: 'scale(0.6)' }}>
        <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          {product.name}
        </Card.Header>
        <Card.Text style={product.salePrice < product.regularPrice ? { textDecoration: 'line-through' } : {}}>${product.regularPrice}</Card.Text>
        {product.salePrice < product.regularPrice && <Card.Text style={{ color: 'red' }}> ${product.salePrice}</Card.Text>}
        <Card.Img src={product.image} alt={product.name} />
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Button variant="light" onClick={() => handleViewClick(product.id)}>View</Button>
        </Card.Footer>
      </Card>
    </Carousel.Item>
  ))}
</Carousel>

        
        </div>
    );
};

export default Search;
