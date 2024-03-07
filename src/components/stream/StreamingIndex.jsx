import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getStreamingDevices} from '../../api/product';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { addToCart } from '../../api/cart';
import messages from '../shared/AutoDismissAlert/messages';
import { createProduct } from '../../api/product';
import { useNavigate } from 'react-router-dom';
import DeviceIndex from './DeviceIndex';


const StreamingIndex = (props) => {

 const [products, setProducts] = useState([]);
    const { laptops, msgAlert,  } = props;
    const { user } = props;


    useEffect(() => {
      getStreamingDevices()
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
        <h1>Streaming Deals</h1>
        <Slider {...settings}>
  {products.map(product => (
   <Card key={product.id} style={{ width: '18rem', height: '16rem', margin: '3rem', overflow: 'hidden' }}>
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
<hr/>
<h1>Streaming Devices</h1>
<DeviceIndex msgAlert={msgAlert} />
<hr/>
<h1>Find A Service</h1>
<div style={{ backgroundColor: 'black' }}>
<iframe src="https://thestreamable.com/matchmaker/embed" title="TV Streaming Matchmaker" width="100%" height="640" frameborder="0"></iframe>
</div>






        </Container>
    );
    }


export default StreamingIndex;