<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->prepare("
    SELECT c.*, u.firstname AS assigned_name
    FROM Contacts c
    LEFT JOIN Users u ON c.assigned_to = u.id
    WHERE c.id = ?
");

$stmt->execute([$_GET['id']]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
