import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // ✅ Add styling here

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    low_stock_threshold: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/task%206/inventory-system/backend/create_item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.message);
      if (response.ok) navigate("/");
    } catch (err) {
      alert("❌ Network error");
      console.error("Error:", err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">➕ Add New Inventory Item</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="low_stock_threshold" placeholder="Low Stock Limit" value={formData.low_stock_threshold} onChange={handleChange} required />
        <button type="submit">✔️ Submit</button>
      </form>
    </div>
  );
};

export default AddItem;
