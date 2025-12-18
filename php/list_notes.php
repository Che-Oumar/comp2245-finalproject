<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->prepare("
    SELECT n.comment, n.created_at, u.firstname, u.lastname
    FROM Notes n
    LEFT JOIN Users u ON n.created_by = u.id
    WHERE n.contact_id = ?


$stmt->execute([$_GET['contact_id']]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
