<?php
$host = "localhost";
$database = "todo_app";
$user = "root";
$pass = "root";  

try {
    $conn = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>