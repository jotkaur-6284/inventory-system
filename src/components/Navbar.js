import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // create this CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">📦 Inventory</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="/add">Add Item</Link></li>
        <li><Link to="/items">View Items</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
