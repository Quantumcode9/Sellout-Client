import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './_Header.scss'


const Header = ({ user }) => {
	const [showUserOptions, setShowUserOptions] = useState(false);
	const [showAdminOptions, setShowAdminOptions] = useState(false);
  
	function toggleUserOptions() {
	  setShowUserOptions(prevState => !prevState);
	}
  
	function toggleAdminOptions() {
	  setShowAdminOptions(prevState => !prevState);
	}

const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}



const unauthenticatedOptions = (
	<>
  <Nav.Item className=''>
    <Link to='sign-up' className='link'>Sign Up</Link>
  </Nav.Item>
  <Nav.Item className=''>
    <Link to='sign-in' className='link'>Sign In</Link>
  </Nav.Item>
</>
)



const authenticatedOptions = (
	<>

		<Nav.Item className=''>
		<Link to='/soundbars' className='link'>
			    Soundbars
		</Link>
		</Nav.Item>
	

		<Nav.Item className=''>
			<Link to='/search' className='link'>
				Search
			</Link>
		</Nav.Item>
		<Nav.Item className=''>
			<Link to='/cart' className='link'>
				Your Cart
			</Link>
		</Nav.Item>

	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className=''>
			<Link to='/' className='link'>
				Home
			</Link>
		</Nav.Item>
	</>
)

return (
<>
	<Navbar bg='' variant='l' expand=''>
	<Navbar.Brand className=''>
	  <Link to='/' style={linkStyle}>
		SELLOUT
	  </Link>
	</Navbar.Brand>
	
	{user && (
		<span className='navbar-text mr-2'>Welcome, {user.name}</span>
	  )}

  {alwaysOptions}
  {user ? authenticatedOptions : unauthenticatedOptions}

<Nav.Item className='m-2'>
	<button onClick={toggleAdminOptions}>Admin</button>
</Nav.Item>
<Nav.Item className='m-2'>
	<button onClick={toggleUserOptions}>User</button>
</Nav.Item>
  

    {showUserOptions && (
	<Navbar bg="" variant="l" className="secondary-navbar">
	<Nav.Item className=''>
		<Link to='change-password' className='link'>
		Change Password
		</Link>
	</Nav.Item>
	<Nav.Item className=''>
		<Link to='sign-out' className='link'>
		Sign Out
		</Link>
	</Nav.Item>
	  <Nav.Item className=''>
		<Link to='/cart' className='link'>
		  Your Cart
		</Link>
	  </Nav.Item>
	</Navbar>
  )}
  
  {showAdminOptions && (
	<Navbar bg="" variant="l" className="secondary-navbar">
	  <Nav.Item className=''>
		<Link to='add-tv' className='link'>
		  Add TV
		</Link>
	  </Nav.Item>
	  <Nav.Item className=''>
		<Link to='add-soundbar' className='link'>
		  Add Soundbar
		</Link>
	  </Nav.Item>
	</Navbar>
  )}

</Navbar>


  

</>


)

}



export default Header