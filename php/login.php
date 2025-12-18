<?php
session_start();
require "db.php";

/*auto admin if no admin exists */
$stmt = $pdo->prepare("SELECT id FROM Users WHERE email = ?");
$stmt->execute(['admin@project2.com']);

if ($stmt->rowCount() === 0) {
    $hash = password_hash("password123", PASSWORD_DEFAULT);

    $seed = $pdo->prepare("
        INSERT INTO Users (firstname, lastname, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    ");

    $seed->execute([
        "Admin",
        "User",
        "admin@project2.com",
        $hash,
        "admin"
    ]);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM Users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
