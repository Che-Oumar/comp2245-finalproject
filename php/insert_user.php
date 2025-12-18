<?php
require "session_check.php";
require "db.php";

$hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO Users (firstname, lastname, email, password, role)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->execute([
    $_POST['first_name'],
    $_POST['last_name'],
    $_POST['email'],
    $hash,
    $_POST['role']
]);

echo json_encode(["status" => "success"]);
