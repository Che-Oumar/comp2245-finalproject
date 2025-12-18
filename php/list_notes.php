<?php
require "session_check.php"; 
require "db.php";

$contact_id = $_GET['contact_id'] ?? 0;
$user_id = $_SESSION['user_id']; 

$stmt = $pdo->prepare("
    SELECT 
        c.id, 
        c.title, c.firstname AS contact_firstname, c.lastname AS contact_lastname,
        c.email, c.telephone, c.company, c.type,
        n.id AS note_id, n.comment, n.created_at AS note_created_at,
        u.firstname AS user_firstname, u.lastname AS user_lastname
    FROM Contacts c
    LEFT JOIN Notes n ON n.contact_id = c.id
    LEFT JOIN Users u ON n.created_by = u.id
    WHERE c.id = ? 
    ORDER BY n.created_at ASC
");
$stmt->execute([$contact_id, $user_id]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$rows) {
    echo json_encode(['error' => 'Contact not found or not accessible']);
    exit;
}

//contact details
$contact = [
    'id' => $rows[0]['id'],
    'title' => $rows[0]['title'],
    'firstname' => $rows[0]['contact_firstname'],
    'lastname' => $rows[0]['contact_lastname'],
    'email' => $rows[0]['email'],
    'telephone' => $rows[0]['telephone'],
    'company' => $rows[0]['company'],
    'type' => $rows[0]['type']
];

// Notes
$notes = [];
foreach ($rows as $row) {
    if ($row['note_id']) { // skip if no notes
        $notes[] = [
            'id' => $row['note_id'],
            'comment' => $row['comment'],
            'created_at' => $row['note_created_at'],
            'user_firstname' => $row['user_firstname'],
            'user_lastname' => $row['user_lastname']
        ];
    }
}

echo json_encode([
    'contact' => $contact,
    'notes' => $notes
]);
