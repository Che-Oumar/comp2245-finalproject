<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->prepare("
    SELECT 
        c.*,
        u.firstname AS assigned_firstname,
        u.lastname AS assigned_lastname,
        creator.firstname AS created_firstname,
        creator.lastname AS created_lastname
    FROM Contacts c
    LEFT JOIN Users u ON c.assigned_to = u.id
    LEFT JOIN Users creator ON c.created_by = creator.id
    WHERE c.id = ?
");

$stmt->execute([$_GET['id']]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
