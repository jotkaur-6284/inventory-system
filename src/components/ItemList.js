import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const navigate = useNavigate();

  const fetchItems = async () => {
    const res = await fetch('http://localhost/task%206/inventory-system/backend/read_items.php');
    const data = await res.json();
    setItems(data);
    setFilteredItems(data);
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const res = await fetch(`http://localhost/task%206/inventory-system/backend/delete_item.php?id=${id}`, {
        method: 'GET',
      });
      const result = await res.json();
      alert(result.message);
      fetchItems(); // Refresh list
    }
  };

  const updateItem = (id) => {
    navigate(`/edit-item/${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilters = () => {
    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }

    if (priceRange === 'low') {
      filtered = filtered.filter(item => parseFloat(item.price) < 100);
    } else if (priceRange === 'medium') {
      filtered = filtered.filter(item => parseFloat(item.price) >= 100 && parseFloat(item.price) <= 500);
    } else if (priceRange === 'high') {
      filtered = filtered.filter(item => parseFloat(item.price) > 500);
    }

    if (stockFilter === 'low') {
      filtered = filtered.filter(item => parseInt(item.quantity) < parseInt(item.low_stock_threshold));
    } else if (stockFilter === 'adequate') {
      filtered = filtered.filter(item => parseInt(item.quantity) >= parseInt(item.low_stock_threshold));
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    handleFilters();
  }, [searchTerm, priceRange, stockFilter, items]);

  return (
    <div className="item-list-container">
      <h2>Inventory Items</h2>

      {/* 🔍 Search + Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '15px' }}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by name or description..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '8px 12px',
            width: '250px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        />

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            marginLeft: '10px',
            marginBottom: '10px'
          }}
        >
          <option value="">💰 All Prices</option>
          <option value="low">Below ₹100</option>
          <option value="medium">₹100 - ₹500</option>
          <option value="high">Above ₹500</option>
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            marginLeft: '10px',
            marginBottom: '10px'
          }}
        >
          <option value="">📦 All Stock Levels</option>
          <option value="low">Low Stock</option>
          <option value="adequate">Adequate Stock</option>
        </select>
      </div>

      {/* Items Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Description</th>
            <th>Low Stock Limit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr
                key={item.id}
                className={parseInt(item.quantity) < parseInt(item.low_stock_threshold) ? 'low-stock' : ''}
              >
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>{item.description}</td>
                <td>{item.low_stock_threshold}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
                  <button className="edit-btn" onClick={() => updateItem(item.id)}>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No items found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
