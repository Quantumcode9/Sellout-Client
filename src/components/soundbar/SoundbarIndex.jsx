import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSoundbars } from '../../api/soundbar';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap';

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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {soundbars.map(soundbar => (
         <Card key={soundbar._id} style={{ flex: '0 0 48%', marginBottom: '20px', width: '50%' }}>
          <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
            {soundbar.brand} {soundbar.modelNumber}</Card.Header>
            <Card.Img variant="top" src={soundbar.image} className="card-img" />
          <Card.Body style={{ backgroundColor: 'black', color: 'white' }}>
        
            <Card.Text>Price: ${soundbar.price}.99 </Card.Text>
                  
          </Card.Body>
          <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          <Link to={`/soundbars/${soundbar._id}`}>
            <Button variant="dark">View</Button>
          </Link>
          </Card.Footer>
        </Card>
  
      ))}
    </div>
    </Container>
  );
}

export default SoundbarIndex;