import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSoundbars } from '../../api/soundbar';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap';
import './SoundbarIndex.scss';
const SoundbarIndex = () => {
  const [soundbars, setSoundbars] = useState([]);

  useEffect(() => {
    getSoundbars()
      .then(response => setSoundbars(response.data.soundbars))
      .catch(error => console.error(error));
  }, []);


  return (

    <Container>
    <h1>Soundbars</h1>
    <div className="soundbar-container">
      {soundbars.map(soundbar => (
        <Link to={`/soundbars/${soundbar._id}`} className="soundbar-link">
          <Card key={soundbar._id} className="soundbar-index-card" style={{ width: '100%' }}>
            <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
              {soundbar.brand} {soundbar.modelNumber}
            </Card.Header>
            <Card.Img variant="top" src={soundbar.image} className="card-img" />
            <Card.Body style={{ backgroundColor: 'black', color: 'white' }}>
              <Card.Text>Price: ${soundbar.price}.99 </Card.Text>
            </Card.Body>
        
          </Card>
        </Link>
      ))}
    </div>
  </Container>
  );
}

export default SoundbarIndex;