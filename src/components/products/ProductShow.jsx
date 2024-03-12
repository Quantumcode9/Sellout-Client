import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, deleteProductReview } from '../../api/product';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button} from 'react-bootstrap';
import { addProductToCart } from '../../api/cart';
import messages from '../shared/AutoDismissAlert/messages'
import ProductReviewModal from '../reviews/ProductReviewModel'
import EditReviewModal from '../reviews/EditReviewModel'
import './ProductShow.scss';

  function ProductShow(props) {
  const { id } = useParams();
  const { user, msgAlert } = props;
  const [product, setProduct] = useState(null);
  const [updated, setUpdated] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const [editReviewModalShow, setEditReviewModalShow] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id)
      .then(res => {
        setProduct(res.data.product);
      })
      .catch(err => {
        console.error(err);
        msgAlert({
          heading: 'Error',
          message: messages.productShowFailure,
          variant: 'danger'
        });
      });
  }, [id, updated, msgAlert]);

  if (!product) return <div>Loading...</div>;




  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) { 
    deleteProductReview(product._id,reviewId, user)
      .then(() => {
        setUpdated(!updated);
        msgAlert({
          heading: 'Review Deleted!',
          message: 'Review deleted successfully!',
          variant: 'success'
        });
      })
      .catch(err => {
        console.error(err);
        msgAlert({
          heading: 'Error',
          message: messages.reviewDeleteFailure,
          variant: 'danger'
        });
      });
  };
  };

  const handleAddToCart = (user) => {
    if (!user) {
      msgAlert({
        heading: 'Error',
        message: 'User is not authenticated',
        variant: 'danger'
      });
      return;
    }
  
    addProductToCart(product._id, user)
      .then(res => {
        msgAlert({
          heading: 'Added to Cart!',
          message: 'Added to cart successfully!',
          variant: 'success'
        });
        setCartItems(prevCartItems => [...prevCartItems, res.data.product]);
        navigate('/cart');
      })
      .catch(err => {
        console.error(err);
        msgAlert({
          heading: 'Slow down!',
          message: messages.itemAlreadyAdded,
          variant: 'danger'
        });
      });
  };

  return (
    <div>
          <Row>
  <Col xs={12} md={6}>
      <Card className="product-show-card2">
        <Card.Header style={{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' , maxHeight:'40px' }}>
        <h2>{product.name}</h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `white`, color: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>

          <img src={product.image} alt={product.name} className='product-image' style={{ width: '100%', maxHeight: '300px' }} />
          </Card.Body>

          <Card.Footer style={{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          <Button onClick={() => handleAddToCart(user)}>Add to Cart</Button>
        {/* <button onClick={() => navigate(`/products/${product._id}/edit`)}>Edit</button> */}
        </Card.Footer>
      </Card>
      </Col>
      
  
  <Col xs={12} md={6}>
      <Card className="product-show-card">
      <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular', maxHeight:'40px' }}>
        <h2> Commercial Details </h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
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
    <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular', maxHeight:'40px' }}>
      <h2>Details</h2>
      </Card.Header>
      <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
      {product.details.map(detail => (
        <div key={detail._id.$oid}>
          <Card.Text>
          <strong>{detail.name}</strong><br/>{detail.value}<hr />
          </Card.Text>
          <hr />
        </div>
      ))}
      </Card.Body>
    </Card>
    </Col>
    <Col xs={12} md={6}>
      <Card className="product-show-card">
      <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' , maxHeight:'40px' }}>
        <h2>Features</h2>
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>

    {product.features.slice(0, 10).map(feature => (
  <div key={feature._id}>
    {feature.feature.split('\n').map((paragraph, index) => (
      paragraph.trim() !== '' && (
        <Card.Text key={index}>
          {index === 0 
            ? <strong dangerouslySetInnerHTML={{ __html: paragraph }}></strong> 
            : <span dangerouslySetInnerHTML={{ __html: paragraph }}></span>
          }
        </Card.Text>
      )
    ))}
    <hr />  
  </div>
))}
        </Card.Body>
      </Card>
    <Card className="product-show-card">
    <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '2.5rem', overflow: 'hidden',  fontSize: '1.4rem' }}>
    User Reviews
</Card.Header>
<Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
<Card.Text> Average Score<br />
  {product.reviews.length > 0 && (
    (() => {
      const averageScore = product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length;
      const scoreColor = averageScore >= 8 ? 'green' : averageScore >= 6 ? 'yellow' : 'red';
      
      return (
        <span style={{ color: scoreColor }}>
          {averageScore.toFixed(1)}
        </span>
      );
    })()
  )}
  {product.reviews.length === 0 && <div>No Reviews</div>}
  <hr />
  Have You Seen This Device? 
  <br />
<Button
    className='m-2'
    variant='info'
    onClick={() => {
    if (user) {
    setReviewModalShow(true);
    } else {
    navigate('/sign-in');
    }
    }}>
    Leave a Review!
</Button>

</Card.Text>
</Card.Body>
</Card>

<Card className="product-show-card">
<Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '2.5rem', overflow: 'hidden',  fontSize: '1.4rem' }}>
    Comments

</Card.Header>
<Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.92)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
<Card.Text>
{product.reviews.map((review, index) => (
<div key={review._id}> 
    <strong>{review.name}</strong>: {review.comment}
    <br />
    Rating: <span style={{ color: review.rating >= 8 ? 'green' : review.rating >= 6 ? 'yellow' : 'red' }}>
    <strong>{review.rating}/10</strong>
    </span>
    <hr />
    {user && review.user && user._id === review.user 
? (
        <div>
        <Button
            className='m-2'
            variant='danger'
            onClick={() => handleDeleteReview(review._id)}
        >
          Delete Review
        </Button>
        </div>
    )
    : null
}
</div>
))}
</Card.Text>
</Card.Body>
</Card>
</Col>
</Row>

<ProductReviewModal
  show={reviewModalShow}
  onHide={() => setReviewModalShow(false)}
  productId={product._id}
  user={user}
  setUpdated={setUpdated}
  msgAlert={msgAlert}
/>
<EditReviewModal

  show={editReviewModalShow}
  onHide={() => setEditReviewModalShow(false)}
  productId={product._id}
  user={user}
  updatedReview={updatedReview}
  setUpdated={setUpdated}
  msgAlert={msgAlert}
/>
    </div>
  );
}


export default ProductShow;