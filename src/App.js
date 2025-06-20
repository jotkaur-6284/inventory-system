import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import EditItem from './components/EditItem';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/edit-item/:id" element={<EditItem />} /> {/* ✅ THIS IS REQUIRED */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
