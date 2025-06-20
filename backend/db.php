<?php
$servername = "localhost";
$username = "root";
$password = "";

// Connect to MySQL server (no database yet)
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS inventory_db";
if ($conn->query($sql) === TRUE) {
    echo "✅ Database created or already exists.<br>";
} else {
    die("❌ Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db("inventory_db");

// Create table if not exists
$table = "CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    low_stock_threshold INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($table) === TRUE) {
    echo "✅ Table 'items' created or already exists.<br>";
} else {
    die("❌ Error creating table: " . $conn->error);
}

$conn->close();
?>
