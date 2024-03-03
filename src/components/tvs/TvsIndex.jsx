import {useState, useEffect} from 'react'
import { getAllTVs } from "../../api/tv"
import TVDeals from '../products/TVDeals';

import LoadingScreen from '../shared/LoadingScreen'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import './TvsIndex.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const TVsIndex = (props) => {
    const [tvs, setTVs] = useState(null)
    const [error, setError] = useState(false)

    // destructure our props
    const { msgAlert } = props

	useEffect(() => {
		getAllTVs()
			.then(res => {
				console.log('use Effect hook ran')
				setTVs(res.data.tvs)
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

    if (!tvs) {
        return <LoadingScreen />

    } else if (tvs.length === 0) {
        return <p>No tvs yet</p>
    }


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

    const tvCards = tvs.map(tv => (
      <Card key={tv.id} style={{ width: '18rem', height: '25rem', margin: '2rem', overflow: 'hidden' }}>
        <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {tv.name}
        </Card.Header>
        <Card.Img variant="top" src={tv.image} className="card-img" />
        <Card.Body style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', height: '3rem' }}>
          <Card.Text style={{ color: 'black', textDecoration: tv.salePrice < tv.regularPrice ? 'line-through' : 'none' }}>
            ${tv.price}.99
          </Card.Text>
          {tv.salePrice < tv.price && <Card.Text style={{ color: 'red', overflow: 'hidden', marginLeft: '10px' }}> ${tv.salePrice}</Card.Text>}
        </Card.Body>
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
          <Link to={`/tvs/${tv._id}`} className="btn btn-primary" style={{ textDecoration: 'none', color: 'inherit' }}>View</Link>
        </Card.Footer>
      </Card>
    ));
    
    return (
      <div>
        <TVDeals msgAlert={msgAlert} />
        <br />
        <h1>TVs</h1>
        <Slider {...settings}>
          {tvCards}
        </Slider>
      </div>
    );

    
      
  




      
}


export default TVsIndex