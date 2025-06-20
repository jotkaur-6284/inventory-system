<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "inventory_db");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "❌ DB connection failed"]);
    exit();
}

// Check if ID is provided via GET
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("DELETE FROM items WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "✅ Item deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "❌ Failed to delete item"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "❌ Item ID not provided"]);
}

$conn->close();
?>
