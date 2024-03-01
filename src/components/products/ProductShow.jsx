import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './ProductShow.scss';

function ProductShow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id)
      .then(res => {
        setProduct(res.data.product); 
        console.log(res.data.product); 
      })
      .catch(err => {
      
      });
  }, [id, updated]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
          <Row>
  <Col xs={12} md={6}>
       <Card className="product-show-card2">
        <Card.Header style={{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' , maxHeight:'40px' }}>
        <h2>{product.name}</h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `white`, color: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>

          <img src={product.image} alt={product.name} className='tv-image'/>
          </Card.Body>
     
        <button onClick={() => navigate(`/products/${product._id}/edit`)}>Edit</button>
      </Card>
      </Col>
      
       
       
  
  <Col xs={12} md={6}>
      <Card className="product-show-card">
      <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular', maxHeight:'40px' }}>
        <h2> Commercial Details </h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Card.Text>
        {product.name}
        </Card.Text>
        <hr/>
        <Row>
    <Col>
        <Card.Text>
        Retail Price:<strong> {product.regularPrice}</strong>
        </Card.Text>
    </Col>
    <Col>
        <Card.Text>
        Sale Price:<strong> {product.salePrice}</strong>
        </Card.Text>
    </Col>
    </Row>
    <hr/>
   
        <Card.Text>
          Brand: {product.manufacturer}
          </Card.Text>
    <Card.Text>
    Model: {product.modelNumber}
          </Card.Text>
    <Card.Text>
    SKU: {product.sku} 
          </Card.Text> 
        </Card.Body>
      </Card>
      </Col>
      </Row>
      <Row>
      <Col xs={12} md={6}>
      <Card className="product-show-card">
      <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' , maxHeight:'40px' }}>
        <h2>Features</h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        {product.features.map(feature => (
          <div key={feature._id}>
           
           <p className='feature-text' dangerouslySetInnerHTML={{ __html: feature.feature.replace(/&#\d+;/g, '') }}></p>
           
            <hr />  
          </div>
        ))}
        </Card.Body>
      </Card>
      </Col>
     
      <Col xs={12} md={6}>
    <Card className="product-show-card">
    <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular', maxHeight:'40px' }}>
      <h2>Details</h2>
      </Card.Header>
      <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
      {product.details.map(detail => (
        <div key={detail._id.$oid}>
          <Card.Text>
          <strong>{detail.name}</strong><br/><italic>{detail.value}</italic><hr />
          </Card.Text>
          <hr />
        </div>
      ))}
      </Card.Body>
    </Card>
    </Col>
    </Row>
    </div>
    
  );
}


export default ProductShow;