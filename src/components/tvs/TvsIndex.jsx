import {useState, useEffect} from 'react'
import { getAllTVs } from "../../api/tv"
import TVDeals from '../products/TVDeals';
import FilterForm from '../shared/TVFilterForm';
import LoadingScreen from '../shared/LoadingScreen'
import { Card, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TvsIndex.scss'





const TVsIndex = (props) => {
    const [tvs, setTVs] = useState(null)
    const [error, setError] = useState(false)

    const [filters, setFilters] = useState({
      size: '',
      refreshRate: '',
      antiGlare: null,
      vrr: null,
      brand: ''
    });

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


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
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
            initialSlide: 1,
            dots: false
          }
        }
      ]
    };
  


    const brands = ['Samsung', 'Sony', 'LG']
      return (
        <div>
          {/* <TVDeals msgAlert={msgAlert} /> */}
          <br />
          <Container>
            <h1>TVs</h1>
            {/* Filter  */}
           
              <FilterForm handleInputChange={handleInputChange} brands={brands} />
              <hr />
      
              <Slider {...settings}>
            {tvs
              .filter(tv => filters.brand ? tv.brand === filters.brand : true)
              .filter(tv => filters.size ? (() => {
                const [minSize, maxSize] = filters.size.split('-').map(Number);
                return tv.size >= minSize && tv.size <= maxSize;
              })() : true)
              .filter(tv => filters.refreshRate ? tv.refreshRate === Number(filters.refreshRate) : true)
              .filter(tv => filters.antiGlare !== null ? tv.antiGlare === filters.antiGlare : true)
              .filter(tv => filters.vrr !== null ? tv.vrr === filters.vrr : true)
              // .filter(tv => filters.price ? tv.price <= Number(filters.price) : true)
              .map(tv => (
 
                    <Card key={tv.id} className="tvCards">
                         <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis',  whiteSpace: 'nowrap' }}>
          {/* {tv.brand}  */}
          {tv.modelNumber}
        </Card.Header>
        <div className="image-container">
        <Card.Img variant="top" src={tv.image} className="card-img" />
        <div className="size-label">{tv.size}'</div>
        </div>
        <Card.Body style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', height: '5rem' }}>
          <Card.Text style={{ color: 'black', textDecoration: tv.salePrice < tv.regularPrice ? 'line-through' : 'none' }}>
            ${tv.price}.99
            {tv.type === 'OLED' && <span style={{ color: 'red', marginLeft: '10px' }}>OLED</span>}
          </Card.Text>
          {tv.salePrice < tv.price && <Card.Text style={{ color: 'red', overflow: 'hidden', marginLeft: '10px' }}> ${tv.salePrice}</Card.Text>}
        </Card.Body>
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular' }}>
        <Button as={Link} to={`/tvs/${tv._id}`} className="btn-primary">
  View
</Button>
        </Card.Footer>
        </Card>
          ))}
      </Slider>
    </Container>
  </div>
);

    

    
      
  




      
}


export default TVsIndex