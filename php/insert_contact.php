<?php
require "session_check.php";
require "db.php";

function clean($v) {
    return htmlspecialchars(trim($v));
}

$required = ['title','firstname','lastname','email','telephone','company','type'];

foreach ($required as $r) {
    if (empty($_POST[$r])) {
        echo json_encode(["status"=>"error"]);
        exit;
    }
}

$stmt = $pdo->prepare("
INSERT INTO Contacts
(title, firstname, lastname, email, telephone, company, type, assigned_to, created_by)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    clean($_POST['title']),
    clean($_POST['firstname']),
    clean($_POST['lastname']),
    clean($_POST['email']),
    clean($_POST['telephone']),
    clean($_POST['company']),
    clean($_POST['type']),
    $_POST['assigned_to'] ?: null,
    $_SESSION['user_id']
]);

echo json_encode(["status"=>"success"]);
