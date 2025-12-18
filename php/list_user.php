<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->query("
    SELECT firstname, lastname, email, role, created_at
    FROM Users
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
 