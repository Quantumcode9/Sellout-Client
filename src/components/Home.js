import TVsIndex from './tvs/TvsIndex'
import { useState, useEffect } from 'react'
import React from "react";
import { getLaptops } from '../api/product'
import { Carousel, Card, Button } from 'react-bootstrap'



const Home = (props) => {
	const { msgAlert } = props
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	getLaptops()
	// 		.then(response => setProducts(response.data.products))
	// 		.catch(error => console.error(error));
	// }
	// 	, []);

		
	
	return (
		<div className="home-container">
			<div>
      <h1>Welcome to Sellout</h1>
      <p> Explore</p>

	  {/* <Carousel> */}
  {/* {products.map((product, index) => (
    <Carousel.Item key={index}>
      <Card style={{ transform: 'scale(0.6)' }}>
        <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          {product.name}
        </Card.Header>
        <Card.Text style={product.salePrice < product.regularPrice ? { textDecoration: 'line-through' } : {}}>${product.regularPrice}</Card.Text>
        {product.salePrice < product.regularPrice && <Card.Text style={{ color: 'red' }}> ${product.salePrice}</Card.Text>}
        <Card.Img src={product.image} alt={product.name} />
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
        <Button variant="dark" onClick={() => (product.id)}>View</Button>
        </Card.Footer>
      </Card>
    </Carousel.Item>
  ))}
</Carousel> */}


</div>

<TVsIndex msgAlert={msgAlert} />
	


			
		</div>
	)
}

export default Home