# Real-Time Inventory Management System

This is a full-stack web application built to manage inventory in real-time. It allows users to **add, view, update, and delete inventory items**, with a dashboard displaying key statistics like total items, low stock, and out of stock.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- **CSS** (Global file: `Allcss.css`, with inline styles for filters/search)
- **Recharts** (for graphs in the Dashboard)
- **React Router DOM** (for navigation between pages)

### Backend
- **PHP** (Server-side logic)
- **MySQL** (Database)
- **XAMPP** (for running Apache and MySQL locally)



## 🔑 Features

- Add new items with name, quantity, price, description, and low stock threshold.
- View all items in a searchable/filterable list.
- Update specific fields of any item.
- Delete items from inventory.
- **Search by name**, **filter by price/stock** with live updates.
- Dashboard with:
  - Total items
  - Low stock items
  - Out of stock items
  - Visual graphs (BarChart using Recharts)
- **Low stock warning** with red highlighting.
- Clean and interactive UI design.

## 🧪 API Endpoints (PHP)

| Method | Endpoint                                                 | Description             |
|--------|----------------------------------------------------------|-------------------------|
| POST   | `/create_item.php`                                       | Add new inventory item  |
| GET    | `/read_items.php`                                        | Get all items           |
| GET    | `/read_items.php?id={id}`                                | Get single item         |
| POST   | `/update_item.php?id={id}`                               | Update specific fields  |
| GET    | `/delete_item.php?id={id}`                               | Delete item             |

## 🧩 Database Setup

Run the `setup.sql` script in your MySQL database to create the `inventory_db` and `items` table.

```sql
CREATE DATABASE IF NOT EXISTS inventory_db;

USE inventory_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  quantity INT,
  price FLOAT,
  description TEXT,
  low_stock_threshold INT
);
