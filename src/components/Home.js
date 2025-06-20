import React from 'react';
import './Allcss.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      
      <header className="hero-section">
        <h1>Smart Real-Time Inventory Management</h1>
        <p>Track, organize, and optimize your stock in real time. All in one place.</p>
        <Link to="/items" className="cta-btn">Get Started</Link>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h3>Real-Time Tracking</h3>
          <p>Monitor inventory levels live and avoid stockouts.</p>
        </div>
        <div className="feature-card">
          <h3>Stock Alerts</h3>
          <p>Get notified automatically when stock is low.</p>
        </div>
        <div className="feature-card">
          <h3>Easy CRUD</h3>
          <p>Add, update, or remove items with ease.</p>
        </div>
        <div className="feature-card">
          <h3>Smart Dashboard</h3>
          <p>Quickly view total and low stock items in one glance.</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>📦 Real-Time Inventory System</h1>
          <p>Monitor, manage, and streamline your stock in one powerful platform.</p>
          <img src="https://cdn-icons-png.flaticon.com/512/10434/10434696.png" alt="Inventory Hero" className="hero-img" />
        </div>
      </section>

      {/* Product Highlights */}
      <div className="main-container">
        <h2>Featured Items</h2>
        <div className="item-grid">
          <div className="item-card">
            <img src="https://cdn-icons-png.flaticon.com/512/679/679922.png" alt="Item 1" />
            <h3>Item A</h3>
            <p>Category: Electronics</p>
          </div>
          <div className="item-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Item 2" />
            <h3>Item B</h3>
            <p>Category: Grocery</p>
          </div>
          <div className="item-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Item 3" />
            <h3>Item C</h3>
            <p>Category: Stationery</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-boxes">
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/1008/1008000.png" alt="Real-time" />
            <h4>Real-Time Sync</h4>
            <p>Instant stock updates as changes happen.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/1827/1827340.png" alt="Alert" />
            <h4>Smart Alerts</h4>
            <p>Get notified for low or out-of-stock items.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png" alt="Dashboard" />
            <h4>Dashboard View</h4>
            <p>Clean and organized inventory overview.</p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="summary">
        <h2>Live Stock Summary</h2>
        <div className="summary-boxes">
          <div className="summary-card">Total Items: <strong>120</strong></div>
          <div className="summary-card">Low Stock: <strong>5</strong></div>
          <div className="summary-card">Out of Stock: <strong>2</strong></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Inventory Management System | Developed by Jot Kaur</p>
      </footer>
    </div>
  );
};

export default Home;
