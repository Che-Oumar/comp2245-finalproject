<?php
require "session_check.php";
require "db.php";

$stmt = $pdo->prepare("
    INSERT INTO Contacts
    (title, firstname, lastname, email, telephone, company, type, assigned_to, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    $_POST['title'],
    $_POST['firstname'],
    $_POST['lastname'],
    $_POST['email'],
    $_POST['telephone'],
    $_POST['company'],
    $_POST['type'],
    $_POST['assigned_to'] ?: null,
    $_SESSION['user_id']
]);

echo json_encode(["status" => "success"]);
