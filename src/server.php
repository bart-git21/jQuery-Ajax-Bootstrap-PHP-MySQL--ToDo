<?php
header('Content-Type: application/json');

try {
    include '../config/db.php';

    $action = $_GET['action'] ?? '';
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    switch ($action) {
        case 'getTasks':
            $stmt = $conn->query('SELECT * FROM tasks');
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($tasks);
            break;

        case 'addTask':
            $task = $data['task'];
            $stmt = $conn->prepare('INSERT INTO tasks (task) VALUES (:task)');
            $stmt->bindParam(':task', $task);
            $stmt->execute();
            http_response_code(201);
            echo json_encode(['id' => $conn->lastInsertId()]);
            break;

        case 'deleteTask':
            $id = $data['id'];
            $stmt = $conn->prepare('DELETE FROM tasks WHERE id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            http_response_code(204);
            break;

        case 'toggleTask':
            $id = $data['id'];
            $stmt = $conn->prepare('UPDATE tasks SET is_completed = NOT is_completed WHERE id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            http_response_code(201);
            echo json_encode(['success' => true]);
            break;

        case 'editTask':
            $id = $data['id'];
            $task = $data['task'];
            $stmt = $conn->prepare('UPDATE tasks SET task = :task, is_completed = 0 WHERE id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':task', $task);
            $stmt->execute();
            http_response_code(201);
            echo json_encode(['success' => true]);
            break;

        default:
            echo json_encode(['error' => 'Invalid action']);
            break;
    }
} catch (PDOException $e) {
    // echo 'Connection failed: ' . $e->getMessage();
    echo json_encode(['error' => $e->getMessage()]);
}