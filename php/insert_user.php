<?php
// php/insert_user.php
session_start();
require "db.php";

header('Content-Type: application/json');

// 1. Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Please log in first']);
    exit();
}

// 2. Check if user is Admin (only Admins can create users)
if ($_SESSION['user_role'] !== 'Admin') {
    echo json_encode(['status' => 'error', 'message' => 'Admin privileges required']);
    exit();
}

// 3. Get and sanitize input
$firstname = trim($_POST['firstname'] ?? '');
$lastname = trim($_POST['lastname'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

// 4. Validate required fields
if (empty($firstname) || empty($lastname) || empty($email) || empty($password) || empty($role)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit();
}

// 5. Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit();
}

// 6. Validate role (must be Admin or Member)
if (!in_array($role, ['Admin', 'Member'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid role selected']);
    exit();
}

// 7. Validate password strength (PROJECT REQUIREMENT: regex)
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
    echo json_encode(['status' => 'error', 'message' => 'Password must be 8+ characters with uppercase, lowercase, and number']);
    exit();
}

try {
    // 8. Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM Users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        exit();
    }
    
    // 9. Hash the password (PROJECT REQUIREMENT: must hash)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // 10. Insert new user
    $stmt = $pdo->prepare("
        INSERT INTO Users (firstname, lastname, email, password, role, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([$firstname, $lastname, $email, $hashedPassword, $role]);
    
    // 11. Success response
    echo json_encode([
        'status' => 'success', 
        'message' => 'User created successfully',
        'user_id' => $pdo->lastInsertId()
    ]);
    
} catch(PDOException $e) {
    // 12. Database error
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>