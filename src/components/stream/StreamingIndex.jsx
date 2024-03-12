import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getStreamingDevices} from '../../api/product';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
        <Container>
        <h1>Streaming Deals</h1>
        <Slider {...settings}>
  {products.map(product => (
  <Card key={product.id} style={{ width: '18rem', height: '16rem', margin: '3rem', overflow: 'hidden' }}>
  <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', fontSize: '15px', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
<hr/>
<h1>Streaming Devices</h1>
<DeviceIndex msgAlert={msgAlert} />
<hr/>



        </Container>
    );
    }


export default StreamingIndex;