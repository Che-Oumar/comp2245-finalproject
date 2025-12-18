<?php
echo "<h2>Database Connection Test</h2>";

// Include your db connection
require_once "db.php";

// Test 1: Check connection
echo "<p>✓ Connected to database</p>";

// Test 2: Count records
$tables = ['Users', 'Contacts', 'Notes'];
foreach ($tables as $table) {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
    $result = $stmt->fetch();
    echo "<p><strong>$table:</strong> {$result['count']} records</p>";
}

// Test 3: Show admin user
echo "<h3>Admin User:</h3>";
$stmt = $pdo->query("SELECT id, firstname, lastname, email, role FROM Users WHERE email = 'admin@project2.com'");
$admin = $stmt->fetch(PDO::FETCH_ASSOC);
echo "<pre>" . print_r($admin, true) . "</pre>";

// Test 4: Show first contact
echo "<h3>First Contact:</h3>";
$stmt = $pdo->query("SELECT * FROM Contacts LIMIT 1");
$contact = $stmt->fetch(PDO::FETCH_ASSOC);
echo "<pre>" . print_r($contact, true) . "</pre>";

// Test 5: Show first note
echo "<h3>First Note:</h3>";
$stmt = $pdo->query("SELECT * FROM Notes LIMIT 1");
$note = $stmt->fetch(PDO::FETCH_ASSOC);
echo "<pre>" . print_r($note, true) . "</pre>";
?>