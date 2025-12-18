<?php
require "session_check.php";
require "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$contact_id = $_POST["contact_id"] ?? null;
$comment    = trim($_POST["comment"] ?? "");
$user_id    = $_SESSION["user_id"] ?? null;

if (!$contact_id || !$comment || !$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data"]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO Notes (contact_id, comment, created_by)
    VALUES (?, ?, ?)
");

$stmt->execute([
    $contact_id,
    htmlspecialchars($comment, ENT_QUOTES, "UTF-8"),
    $user_id
]);

echo json_encode(["status" => "success"]);
