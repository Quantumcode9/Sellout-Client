
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneTV, removeTV, updateTV } from '../../api/tv'
import { addToCart } from '../../api/cart'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button, Row, Col  } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditTVModal from './EditTvModal'
import './TvShow.scss'
//import SoundbarShow from '../soundbars/SoundbarShow'
import NewReviewModal from '../reviews/NewReviewModal'
import EditReviewModal from '../reviews/EditReviewModel'
import { deleteReview } from '../../api/tv'



const soundbarCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',

    flexFlow: 'row wrap'
}
const buildQuality = ['poor', 'fair', 'good', 'excellent'];




const TVShow = (props) => {
    const { tvId } = useParams()
    const { user, msgAlert } = props

    const [tv, setTV] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editReviewModalShow, setEditReviewModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        getOneTV(tvId)
            .then(res => setTV(res.data.tv))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])
    

    const deleteTV = () => {
        removeTV(user, tv._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteTVSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    const refreshTvShow = () => {
        getOneTV(tvId)
            .then((res) => {
                setTV(res.data.tv);
            })
            .catch((error) => {
                console.error('Error getting TV show:', error);
            });
    };
    
    const handleDeleteReview = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) { 
        deleteReview(tvId, reviewId, user)
            .then(() => {
            refreshTvShow();
            })
            .catch((error) => {
            console.error('Error deleting review:', error);
            });
        }
    };
    

    const [cartItems, setCartItems] = useState([])

    const handleAddToCart = (tv) => {
        addToCart(tv._id, user)
        .then(res => {
            msgAlert({
                heading: 'Added to Cart!',
                message: 'Added to cart successfully!',
                variant: 'success'
            })
            setCartItems(prevCartItems => [...prevCartItems, res.data.tv]);
            navigate('/cart')
        })
        .catch(err => {
            console.error(err);
            msgAlert({
                heading: 'Slow down!',
                message: messages.itemAlreadyAdded,
                variant: 'danger'
            })
        });
    }; 

    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [updatedReview, setUpdatedReview] = useState(null)



    if (!tv) {
        return <LoadingScreen />
    }

return (
<>
<Container className='hero'>
    <Card className="my-card">
        <Card.Header style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            {tv.brand} { tv.modelNumber}
        </Card.Header>
        <Card.Body style={{ overflow: 'hidden' }}>
            <img src={tv.image2 ? tv.image2 : tv.image} alt={tv.modelNumber} className='tv-image'/>
        </Card.Body>
        <Card.Footer style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            {tv.brand} { tv.modelNumber}
        </Card.Footer>
    </Card>
</Container>
            
<Container>
    <Row>
        <Col md={6}>
        <Card>
            <Card.Header style={{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
            {tv.brand} {tv.modelNumber}
            </Card.Header>
            <Card.Body className="image-contain">
                
            <img src={tv.image} alt={tv.modelNumber} className='tv-image-profile'/>
            <img src={tv.image3 || tv.image} alt={`${tv.modelNumber}-hover`} className='tv-image-hover'/>
        
            </Card.Body>      
            <Card.Footer style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            {
                tv.owner && user && tv.owner._id === user._id
                ?
                <>
                    <Button
                        className='m-2'
                        variant='warning'
                        onClick={() => setEditModalShow(true)}
                    >
                        Update TV
                    </Button>
                    <Button
                        className='m-2'
                        variant='danger'
                        onClick={() => deleteTV()}
                    >
                        Delete TV 
                    </Button>
                    <Button
                        className='m-2 cart-button'
                        variant='dark'
                onClick={() => handleAddToCart(tv)}
                    >
                        Add to Cart
                    </Button>
                </>
                :
                null
            }
            <br/>
            {
            }
        </Card.Footer>

        </Card>
        <br/>
        </Col>
                <Col md={6}>
                <Card>
                <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        Features
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Card.Text>
            {tv.features}
        </Card.Text>
        </Card.Body>
    </Card>
    <br/>
    <Card className="commercial-details">
<Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
    Commercial Details
</Card.Header>
<Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
    <Row>
    <Col>
        <Card.Text>
        Brand:<strong> {tv.brand}</strong>
        </Card.Text>
    </Col>
    <Col>
        <Card.Text>
        SKU:<strong> {tv.sku}</strong>
        </Card.Text>
    </Col>
    </Row>
    <hr/>
    <Row>
    <Col>
        <Card.Text>
        Price:<strong> ${tv.price}</strong>
        </Card.Text>
    </Col>
    <Col>
        <Card.Text>
        Model Year:<strong> {tv.modelYear}</strong>
        </Card.Text>
    </Col>
    </Row>

</Card.Body>
</Card>
    </Col>
        </Row>

        
        <Row>
    <Col md={6}>
    <Card>
        <Card.Header style={{ color: 'black', backgroundColor: `rgba(255,255,255,0.80)`, fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            Tech Specs
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Card.Text className="card-text">
            Size:<strong> {tv.size}"</strong><hr/> 
            Type:<strong> {tv.type}</strong> <hr/>
            Refresh Rate:<strong> {tv.refreshRate}hz</strong><hr/>
            HDR Format:<strong> {tv.highDynamicRangeFormat}</strong><hr/>
            Color:<strong> {tv.wideColorGamut ? 'Wide Color Gamut' : 'Standard Color Gamut'}</strong><hr/>
            Contrast Ratio: <strong> 
            <span style={{
            color: tv.contrastRatio > 10000 ? 'green' :
                    tv.contrastRatio === 'inf' ? 'green' :  
                    tv.contrastRatio > 5000 ? 'lightgreen' :
                    tv.contrastRatio > 3000 ? 'yellow' : 'red'
            }}> 
            {tv.contrastRatio} :1
            </span> </strong><hr/>
            Brightness:<strong> {tv.brightness} nits</strong><hr/>
            Smart OS:<strong> {tv.smartOS}</strong><hr/>
            Backlight Type:<strong> {tv.backlightType}</strong><hr/>
            Anti-Glare:<strong> {tv.antiGlare ? 'Yes' : 'No'}</strong><hr/>
            VRR:<strong> {tv.vrr ? 'Yes' : 'No'}</strong><hr/>
            SKU:<strong> {tv.sku}</strong><hr/> 
        </Card.Text>
        </Card.Body>
    </Card>
    </Col>
    <Col md={6}>
    <Card>
        <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            Reviews
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            <Card.Text>
                Overall Rating: <span style={{ color: tv.overallRating >= 8 ? 'green' : tv.overallRating >= 6 ? 'yellow' : 'red' }}><strong>{tv.overallRating}/10</strong></span>
                <hr/>
                Build Quality:  <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: tv.buildQuality === 'poor' ? 'red' :
                tv.buildQuality === 'fair' ? 'yellow' :
                tv.buildQuality === 'good' ? 'lightgreen' : 'green',
                display: 'inline-block',
                }} /> <hr/>
                Overview: <br/> 
                {tv.overview}
            </Card.Text>
        </Card.Body>
    </Card>
    <br/>
    <Card>
        <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            User Reviews
        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Card.Text>
        Seen the {tv.brand} {tv.modelNumber}? 
        <hr/>
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
    <br/>
                
        
    <Card>
        <Card.Header style={{ color: 'black', backgroundColor: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            Comments

        </Card.Header>
        <Card.Body style= {{ backgroundColor: `rgba(0,0,0,0.85)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Card.Text>
        {tv.reviews.map((review, index) => (
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
                    variant='warning'
                    onClick={() => {
                        console.log(review);
                        setUpdatedReview(review._id);
                
                        setEditReviewModalShow(true)
            
                    }}
                >
                    Edit Review
                </Button>
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

</Container>
<Container className='m-2' style={soundbarCardContainerLayout}>
    {/* {soundbarCards} */}
</Container>
<EditTVModal 
    user={user}
    show={editModalShow}
    updateTV={updateTV}
    msgAlert={msgAlert}
    handleClose={() => setEditModalShow(false)}
    tv={tv}
    triggerRefresh={() => setUpdated(prev => !prev)}
/>
<NewReviewModal 
    tvId={tv._id} 
    tv={tv}
    user={user} 
    show={reviewModalShow}
    msgAlert={msgAlert}
    handleClose={() => setReviewModalShow(false)}
    triggerRefresh={() => setUpdated(prev => !prev)}
/>
<EditReviewModal
    tvId={tv._id}
    tv={tv}
    user={user}
    updatedReview={updatedReview}
    show={editReviewModalShow}
    handleClose={() => setEditReviewModalShow(false)}
    triggerRefresh={() => setUpdated(prev => !prev)}
    msgAlert={msgAlert}
/>
        </>
    )
}

export default TVShow