<?php
require "session_check.php";
require "db.php";
/*for the dashboard numbers */
$total = $pdo->query("SELECT COUNT(*) FROM Contacts")->fetchColumn();

$new = $pdo->query("
    SELECT COUNT(*) FROM Contacts
    WHERE created_at >= NOW() - INTERVAL 7 DAY
")->fetchColumn();

echo json_encode([
    "total" => $total,
    "new" => $new
]);
