import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('http://localhost/task%206/inventory-system/backend/read_items.php')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const totalItems = items.length;
  const lowStockItems = items.filter(i => parseInt(i.quantity) < parseInt(i.low_stock_threshold));
  const outOfStockItems = items.filter(i => parseInt(i.quantity) === 0);

  const chartData = [
    { name: 'Total', value: totalItems },
    { name: 'Low Stock', value: lowStockItems.length },
    { name: 'Out of Stock', value: outOfStockItems.length },
  ];

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <>
          <h2>👋 Welcome Back!</h2>
          <div className="overview-cards">
            <div className="card"><h4>Total Items</h4><p>{totalItems}</p></div>
            <div className="card"><h4>Low Stock</h4><p>{lowStockItems.length}</p></div>
            <div className="card"><h4>Out of Stock</h4><p>{outOfStockItems.length}</p></div>
          </div>
          <div className="chart-container">
            <h3>Stock Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00b894" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      );
    } else if (activeTab === 'low') {
      return (
        <>
          <h3>Low Stock Items</h3>
          <table className="simple-table">
            <thead>
              <tr><th>Name</th><th>Qty</th><th>Limit</th></tr>
            </thead>
            <tbody>
              {lowStockItems.map(item => (
                <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td><td>{item.low_stock_threshold}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (activeTab === 'out') {
      return (
        <>
          <h3>Out of Stock Items</h3>
          <table className="simple-table">
            <thead>
              <tr><th>Name</th><th>Qty</th></tr>
            </thead>
            <tbody>
              {outOfStockItems.map(item => (
                <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (activeTab === 'all') {
      return (
        <>
          <h3>All Inventory Items</h3>
          <table className="simple-table">
            <thead>
              <tr><th>Name</th><th>Qty</th><th>Price</th><th>Desc</th></tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td><td>₹{item.price}</td><td>{item.description}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h3>📊 Menu</h3>
        <ul className="sidebar-menu">
          <li onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => setActiveTab('low')} className={activeTab === 'low' ? 'active' : ''}>Low Stock</li>
          <li onClick={() => setActiveTab('out')} className={activeTab === 'out' ? 'active' : ''}>Out of Stock</li>
          <li onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>All Items</li>
        </ul>
      </div>

      <div className="dashboard-right">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
