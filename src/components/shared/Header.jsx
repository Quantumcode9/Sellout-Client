import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './_Header.scss'


const Header = ({ user }) => {
	const [showUserOptions, setShowUserOptions] = useState(false);
    const [showSideOptions, setShowSideOptions] = useState(false);
	const [showAdminOptions, setShowAdminOptions] = useState(false);
	const [showAdminSideOptions, setShowAdminSideOptions] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setShowSideOptions(false);
        setShowAdminOptions(false);	
    };

	function toggleUserOptions() {
	setShowUserOptions(prevState => !prevState);
	// Closes the secondary sidebar after 10 seconds
	if (!showUserOptions) {
		setTimeout(() => {
		setShowUserOptions(false);
		}, 10000);
	}
	}
	
    function toggleSideOptions() {
        setShowSideOptions(prevState => !prevState);

}

	function toggleAdminOptions() {
	setShowAdminOptions(prevState => !prevState);
	}

	function toggleAdminSideOptions() {
		setShowAdminSideOptions(prevState => !prevState);
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

	<Nav.Item className='nav-item'>
	<Link to='/soundbars' className='link'>
	Soundbars
	</Link>
	</Nav.Item>
	<Nav.Item className='nav-item'>
	<Link to='/streaming' className='link'>
	Streaming
	</Link>
	</Nav.Item>


	<Nav.Item className='nav-item'>
		<Link to='/search' className='link'>
			Search
		</Link>
	</Nav.Item>

	</>
)
const alwaysOptions = (
	<>
		<Nav.Item className=''>
			<Link to='tvs/TvsIndex' className='link'>
				TVs
			</Link>
		</Nav.Item>
	</>
)
return (
<>
	<Navbar bg='' variant='l' expand='' className='navbar sticky-top'>
	<Navbar.Brand className=''>
	<Link to='/' style={linkStyle}>
		SELLOUT
	</Link>
	</Navbar.Brand>
	<Nav.Item className='welcome'>
	{user && (
		<span className='navbar-text mr-2'>Welcome, {user.name}</span>
	)}
	</Nav.Item>
{alwaysOptions}
{user ? authenticatedOptions : unauthenticatedOptions}
<Nav.Item className=''>
  {user && <button className='link' onClick={toggleUserOptions}>User</button>}
</Nav.Item>
    {showUserOptions && (
		
	<Navbar bg="" variant="l" className="secondary-navbar">
	<Nav.Item className=''>
		<Link to='change-password' className='link' onClick={toggleUserOptions}>
		Change Password
		</Link>
	</Nav.Item>
	<Nav.Item className=''>
		<Link to='sign-out' className='link' onClick={toggleUserOptions}>
		Sign Out
		</Link>
	</Nav.Item>
	<Nav.Item className=''>
		<Link to='/cart' className='link' onClick={toggleUserOptions}>
		Your Cart
		</Link>
	</Nav.Item>
	</Navbar>
)}
<Nav.Item className=''>
  {user && user.isAdmin && <button className='link' onClick={toggleAdminOptions}>Admin</button>}
</Nav.Item>
{user && user.isAdmin && showAdminOptions && (
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
	<Nav.Item className=''>
		<Link to='/stream/create' className='link'>
			Create Streaming Device
		</Link>
	</Nav.Item>
	</Navbar>
)}
<header>
  <button className="hamburger" onClick={toggleSidebar}></button>
  <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
  {user ? (
  <p style={{ textDecoration: 'underline', color: 'white', textAlign:'center' }}>{user.name}</p>
) : (
  <Link to="/sign-in" className="link" onClick={toggleSidebar} style={{ textDecoration: 'underline' }}>
    SIGN IN
  </Link>
)}
    {alwaysOptions}
    {user ? authenticatedOptions : unauthenticatedOptions}
	<Link to='tvs/TvsIndex' className='link' onClick={toggleSidebar}>
	TVs
    </Link>
	<Link to='/soundbars' className='link' onClick={toggleSidebar}>
	Soundbars
	</Link>
	<Link to='/streaming' className='link' onClick={toggleSidebar}>
	Streaming
    </Link>
	<Link to='/search' className='link' onClick={toggleSidebar}>
	Search
	</Link>
	{user && <button className='link' onClick={toggleSideOptions}>User</button>}
	
    {showSideOptions && (

	<div className="secondary-sidebar">
		<Link to='change-password' className='link' onClick={toggleSidebar}>
		Change Password
		</Link>
		<Link to='sign-out' className='link' onClick={toggleSidebar}>
		Sign Out
		</Link>
	</div>
    )}

{user && user.isAdmin && <button className='link' onClick={toggleAdminSideOptions}>Admin</button>}
    {showAdminSideOptions && (
    <div className="secondary-sidebar">
        <Link to='add-tv' className='link'onClick={toggleSidebar}>
            Add TV
        </Link>
        <Link to='add-soundbar' className='link'onClick={toggleSidebar}>
            Add Soundbar
        </Link>
        <Link to='/stream/create' className='link'onClick={toggleSidebar}>
            Create Device
        </Link>
    </div>
    )}
    <Link to='/cart' className='link' onClick={toggleSidebar}>
                Your Cart
            </Link>
            <button className='link' onClick={() => setSidebarOpen(false)}>Close</button>
</nav>
</header>

</Navbar>
</>
)
}
export default Header