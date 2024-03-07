import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSoundbars } from '../../api/soundbar';
import { Card, Container, Button } from 'react-bootstrap';
import './SoundbarIndex.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SoundbarIndex = () => {
  const [soundbars, setSoundbars] = useState([]);

  useEffect(() => {
    getSoundbars()
      .then(response => setSoundbars(response.data.soundbars))
      .catch(error => console.error(error));
  }, []);


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
  


  return (

//     <Container>
//     <h1>Soundbars</h1>
//     <div className="soundbar-container">
//       {soundbars.map(soundbar => (
//         <Link to={`/soundbars/${soundbar._id}`} className="soundbar-link">
//           <Card key={soundbar._id} className="soundbar-index-card" style={{ width: '100%' }}>
//           <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//               {soundbar.brand} {soundbar.modelNumber}
//             </Card.Header>
//             <Card.Img variant="top" src={soundbar.image} className="card-img" />
//             <Card.Footer style={{ backgroundColor: 'black', color: 'white', marginTop: '5px' }}>
//               <Card.Text>Price: ${soundbar.price}.99 </Card.Text>
//             </Card.Footer>
        
//           </Card>
//         </Link>
//       ))}
//     </div>
//   </Container>
//   );
// }

<Container className="">
<h1>Soundbars</h1>
{/* <div className="soundbar-cards"> */}
  <Slider {...settings}>
  {soundbars.map(soundbar => (
<Card key={soundbar._id} className="soundbar-index-card">
<Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', fontSize: '12px', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis',  whiteSpace: 'nowrap' }}>
{soundbar.brand} <br /> {soundbar.modelNumber}

</Card.Header>
<div className="soundbar-container">
<Card.Img variant="top" src={soundbar.image} className="card-img" />
<div className="size-label">{soundbar.channels}</div>
</div>
<Card.Body style={{ display: 'flex', alignItems: 'right', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', height: '3rem' }}>

<Card.Text style={{ color: 'black', textDecoration: soundbar.salePrice < soundbar.regularPrice ? 'line-through' : 'none' }}>
  ${soundbar.price}.99
</Card.Text>

</Card.Body>
<Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '3rem' }}>
<Button as={Link} to={`/soundbars/${soundbar._id}`} style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans, Lucida Sans Regular', height: '2rem' , fontSize: '12px' }}>
View
</Button>
</Card.Footer>
</Card>
))}
</Slider>

{/* </div> */}
</Container>
);}




export default SoundbarIndex;