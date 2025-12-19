<?php
require "session_check.php";
require "db.php";

$contact_id = $_POST['contact_id'] ?? null;
$user_id = $_SESSION['user_id'];

if (!$contact_id) {
    http_response_code(400);
    exit;
}

$stmt = $pdo->prepare("
    UPDATE Contacts
    SET assigned_to = ?, updated_at = NOW()
    WHERE id = ?
");
$stmt->execute([$user_id, $contact_id]);

echo json_encode(["status" => "success"]);
