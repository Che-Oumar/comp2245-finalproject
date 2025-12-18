<?php
require "session_check.php";
require "db.php";

$contact_id = $_POST['contact_id'] ?? null;

if (!$contact_id) {
    http_response_code(400);
    exit;
}

$stmt = $pdo->prepare("SELECT type FROM Contacts WHERE id = ?");
$stmt->execute([$contact_id]);
$current = $stmt->fetchColumn();

if (!$current) {
    http_response_code(404);
    exit;
}

$newType = ($current === "Sales Lead") ? "Support" : "Sales Lead";

$update = $pdo->prepare("
    UPDATE Contacts 
    SET type = ?, updated_at = NOW()
    WHERE id = ?
");
$update->execute([$newType, $contact_id]);

echo json_encode([
    "status" => "success",
    "type" => $newType
]);
