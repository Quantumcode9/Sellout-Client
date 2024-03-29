import React, { useState, useEffect } from 'react';
import { searchProducts, createProduct } from '../../api/product';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Search = () => {
    const [keyword, setKeyword] = useState(''); 
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({});
    const popularSearches = ['routers', 'headphones', 'monitors'];

    const handlePopularSearchClick = (searchTerm) => {
      setKeyword(searchTerm);
      searchProducts(searchTerm)
        .then((response) => {
          console.log('This came through', response.data.products);
          setProducts(response.data.products); 
        })
        .catch((error) => {
          console.error('Failed to search products:', error);
        });
    };


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
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
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
<div>
<div className="container">
  <div className="row justify-content-center">
    <Form className="col-12 col-md-6" onSubmit={handleSearch}>
      <Form.Group controlId="searchKeyword">
        <Form.Control style={{ width: '100%', marginTop: '2rem' }}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for products..."
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        Search
      </Button>
      <div className="mt-3">
        {popularSearches.map((searchTerm, index) => (
          <Button key={index} variant="" onClick={() => handlePopularSearchClick(searchTerm)}>
            {searchTerm}
          </Button>
        ))}
      </div>
    </Form>
  </div>
</div>
<div className="container">
  <h1>Search Results</h1>


<Slider {...settings}>
  {products.map(product => (
    <Card key={product.id} style={{ width: '18rem', height: '16rem', margin: '3rem', overflow: 'hidden' }}>
  <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', fontSize: '15px', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {product.name}
  </Card.Header>
  <Card.Img variant="top" src={product.image} className="card-img" style={{ maxHeight: '200px' }} />
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
