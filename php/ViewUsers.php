<?php

require "session_check.php";
require "db.php";

if ($_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    
}

$stmt = $pdo->query("
    SELECT firstname, lastname, email, role, created_at
    FROM Users
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
