import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-tv">Add TV</Link>
    </nav>
  );
}

export default Navbar;
