import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Allcss.css';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [updateFields, setUpdateFields] = useState({});
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/task%206/inventory-system/backend/read_items.php?id=${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => alert('❌ Failed to fetch item'));
  }, [id]);

  const handleCheckboxChange = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
      const copy = { ...updateFields };
      delete copy[field];
      setUpdateFields(copy);
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleInputChange = (e) => {
    setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost/task%206/inventory-system/backend/update_item.php?id=${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateFields)
    });

    const result = await response.json();
    alert(result.message);
    if (response.ok) navigate("/items");
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="edit-container">
      <h2 className="edit-heading">✏️ Edit Item: <span className="highlight">{item.name}</span></h2>
      
      <div className="item-details-box">
        <h4>🗂 Current Details</h4>
        <p><b>Name:</b> {item.name}</p>
        <p><b>Quantity:</b> {item.quantity}</p>
        <p><b>Price:</b> ₹{item.price}</p>
        <p><b>Description:</b> {item.description}</p>
        <p><b>Low Stock Limit:</b> {item.low_stock_threshold}</p>
      </div>

      <form onSubmit={handleSubmit} className="update-form">
        <h3>🛠️ Select Fields to Update</h3>
        <div className="checkbox-group">
          <label><input type="checkbox" onChange={() => handleCheckboxChange('name')} /> Name</label>
          <label><input type="checkbox" onChange={() => handleCheckboxChange('quantity')} /> Quantity</label>
          <label><input type="checkbox" onChange={() => handleCheckboxChange('price')} /> Price</label>
          <label><input type="checkbox" onChange={() => handleCheckboxChange('description')} /> Description</label>
          <label><input type="checkbox" onChange={() => handleCheckboxChange('low_stock_threshold')} /> Low Stock Limit</label>
        </div>

        <div className="update-fields">
          {selectedFields.includes('name') && (
            <input type="text" name="name" placeholder="New Name" onChange={handleInputChange} />
          )}
          {selectedFields.includes('quantity') && (
            <input type="number" name="quantity" placeholder="New Quantity" onChange={handleInputChange} />
          )}
          {selectedFields.includes('price') && (
            <input type="number" name="price" placeholder="New Price" onChange={handleInputChange} />
          )}
          {selectedFields.includes('description') && (
            <textarea name="description" placeholder="New Description" onChange={handleInputChange}></textarea>
          )}
          {selectedFields.includes('low_stock_threshold') && (
            <input type="number" name="low_stock_threshold" placeholder="New Low Stock Limit" onChange={handleInputChange} />
          )}
        </div>

        <button type="submit" className="update-btn">✅ Update</button>
      </form>
    </div>
  );
};

export default EditItem;
