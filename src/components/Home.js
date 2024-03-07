import TVsIndex from './tvs/TvsIndex'
import { useState, useEffect } from 'react'
import React from "react";
import { getLaptops } from '../api/product'
import { Carousel, Card, Button } from 'react-bootstrap'
import Laptops from './products/Laptops'






const Home = (props) => {
	const { msgAlert } = props

	return (
		<div className="home-container">
			<div>
      <h1>Welcome to Sellout</h1>
      <p> Explore</p>
</div>


<Laptops msgAlert={msgAlert} />

		</div>
	)
}

export default Home