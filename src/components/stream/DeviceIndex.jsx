import {useState, useEffect} from 'react'
import { getDevices } from "../../api/device"

import LoadingScreen from '../shared/LoadingScreen'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const DeviceIndex = (props) => {
    const [devices, setDevices] = useState(null)
    const [error, setError] = useState(false)

    // destructure our props
    const { msgAlert } = props

	useEffect(() => {
		getDevices()
			.then(res => {
				console.log('use Effect hook ran')
				setDevices(res.data.devices)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!devices) {
        return <LoadingScreen />

    } else if (devices.length === 0) {
        return <p>No devices yet</p>
    }


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
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
           
            }
          }
        ]
      };



    return (

        <Slider {...settings}>
  
        { devices.map(device => (
            //  <Link to={`/stream/${device._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
         <Card key={device.id} style={{ width: '22rem', height: '30rem', margin: '2rem', overflow: 'hidden' }}>
        <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', fontSize: '15px', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {device.name}
        </Card.Header>
        <Card.Img variant="top" src={device.image} className="card-img" style={{ maxHeight: '250px', maxWidth: '300px' }} />
        <Card.Body style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', height: '3rem' }}>
        <Card.Text style={{ color: 'black', textDecoration: device.salePrice < device.regularPrice ? 'line-through' : 'none' }}>
          ${device.regularPrice}.99
        </Card.Text>
        {device.salePrice < device.regularPrice && <Card.Text style={{ color: 'red', overflow: 'hidden',marginLeft: '10px' }}> ${device.salePrice}</Card.Text>}
      </Card.Body>
              <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
              <Link to={`/stream/${device._id}`} className="btn btn-light" style={{ textDecoration: 'none', color: 'black' }}>View</Link>
            </Card.Footer>
          </Card>

        //   </Link>
        ))}

    </Slider>

    )
}




export default DeviceIndex