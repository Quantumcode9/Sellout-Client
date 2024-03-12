import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDevice } from '../../api/device'
import { addToCart } from '../../api/cart'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button, Row, Col  } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// import EditDeviceModal from './EditDeviceModal'

const DeviceShow = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props

    const [device, setDevice] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getDevice(id)
            .then(res => setDevice(res.data.device))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [id, msgAlert])
    
    const [cartItems, setCartItems] = useState([])
    const handleAddToCart = (device) => {
        addToCart(device._id, user)
        .then(res => {
            msgAlert({
                heading: 'Added to Cart!',
                message: 'Added to cart successfully!',
                variant: 'success'
            })
            setCartItems(prevCartItems => [...prevCartItems, res.data.device]);
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
    if (!device) {
        return <LoadingScreen />
    }

    return (
        <>
        {device.image2 && (
    <Container className='hero'>
        <Card className="my-card">
            <Card.Header style={{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                {device.name}
            </Card.Header>
            <Card.Body style={{ overflow: 'hidden' }}>
                <img src={device.image2} alt={device.modelNumber} className='tv-image'/>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                {device.manufacturer} 
            </Card.Footer>
        </Card>
    </Container>
        )}
    <Container className=''>
            <Row>
                <Col md={6}>
                <Card>
    <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', fontSize: '15px', height: '4rem' }}>
                    { device.name}
                    </Card.Header>
                    <Card.Body>
                            <img src={device.image} alt={device.modelNumber} className='device-image'/>
                    </Card.Body>
                    <Card.Footer style= {{ backgroundColor: `rgba(0,0,0,0.95)`, color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                        {
                        device.owner && user && device.owner._id === user._id
                        ?
                        <>
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
            {device.features}
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
        Brand:<strong> {device.manufacturer}</strong>
        </Card.Text>
    </Col>
    <Col>
        <Card.Text>
        SKU:<strong> {device.sku}</strong>
        </Card.Text>
    </Col>
    </Row>
    <hr/>
    <Row>
    <Col>
        <Card.Text>
        Price:<strong> ${device.regularPrice}</strong>

        </Card.Text>
    </Col>
    <Col>
        <Card.Text>
        Model Number:<strong> {device.modelNumber}</strong>
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
            Details:<strong> {device.details}</strong><hr/>
            HDR Format:<strong> {device.hdrFormat}</strong><hr/>
            Resolution:<strong> {device.resolution}</strong><hr/>
            Smart OS:<strong> {device.smartOS}</strong><hr/>
            SKU:<strong> {device.sku}</strong><hr/> 
            HDR:<strong> {device.hdr ? 'Yes' : 'No'}</strong><hr/>
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
                Overall Rating: <span style={{ color: device.overallRating >= 8 ? 'green' : device.overallRating >= 6 ? 'yellow' : 'red' }}><strong>{device.overallRating}/10</strong></span>
                <hr/>
                Overview: <br/> 
                {device.overview}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
        </Row>
</Container>

        </>

)
}


export default DeviceShow