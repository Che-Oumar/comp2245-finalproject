<?php
require "session_check.php";
require "db.php";

$filter = $_GET['filter'] ?? 'all';

$sql = "
SELECT c.*, u.firstname uf, u.lastname ul
FROM Contacts c
LEFT JOIN Users u ON c.assigned_to = u.id
";

$params = [];

if ($filter === "mine") {
    $sql .= " WHERE c.assigned_to = ?";
    $params[] = $_SESSION['user_id'];
} elseif ($filter !== "all") {
    $sql .= " WHERE c.type = ?";
    $params[] = $filter;
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
