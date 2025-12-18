<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->query("
    SELECT id, firstname, lastname
    FROM Users
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
