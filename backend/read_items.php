
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "inventory_db");

if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT * FROM items WHERE id = $id";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        echo json_encode($row); // return single item
    } else {
        echo json_encode(["message" => "❌ Item not found"]);
    }

} else {
    $sql = "SELECT * FROM items";
    $result = $conn->query($sql);
    $items = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
}
?>
