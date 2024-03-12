import React from "react";
import Laptops from './products/Laptops'


const Home = (props) => {
	const { msgAlert } = props

	return (
<div className="home-container">
    <div>
		<h1>Home</h1>
      <p> Explore</p>
	</div>
<Laptops msgAlert={msgAlert} />
</div>
	)
}
export default Home