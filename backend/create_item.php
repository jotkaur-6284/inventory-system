<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli("localhost", "root", "", "inventory_db");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "❌ DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['name'], $data['quantity'], $data['price'], $data['description'], $data['low_stock_threshold']) &&
    $data['name'] !== '' &&
    $data['description'] !== '' &&
    is_numeric($data['quantity']) &&
    is_numeric($data['price']) &&
    is_numeric($data['low_stock_threshold'])
) {
    $stmt = $conn->prepare("INSERT INTO items (name, quantity, price, description, low_stock_threshold) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sidsi", $data['name'], $data['quantity'], $data['price'], $data['description'], $data['low_stock_threshold']);

    if ($stmt->execute()) {
        echo json_encode(["message" => "✅ Item added successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "❌ Insert failed"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "❌ Invalid or missing data"]);
}

$conn->close();
?>
