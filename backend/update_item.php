<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// DB Connection
$conn = new mysqli("localhost", "root", "", "inventory_db");

if ($conn->connect_error) {
    echo json_encode(["message" => "❌ DB connection failed"]);
    exit;
}

// Get ID from query
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$data = json_decode(file_get_contents("php://input"), true);

if (!$id || !$data || !is_array($data)) {
    echo json_encode(["message" => "❌ Invalid update"]);
    exit;
}

// Build update query
$updates = [];
foreach ($data as $key => $value) {
    $updates[] = "$key='" . $conn->real_escape_string($value) . "'";
}
$sql = "UPDATE items SET " . implode(", ", $updates) . " WHERE id=$id";

// Run update
if ($conn->query($sql)) {
    echo json_encode(["message" => "✅ Item updated successfully"]);
} else {
    echo json_encode(["message" => "❌ Update failed"]);
}
?>
