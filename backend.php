<?php
header("Content-Type: application/json; charset=UTF-8");

try {
    $conn = new PDO(
        'mysql:host=localhost;dbname=hgergo16',
        'hgergo16',
        'Gamf123.',
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );

    $conn->exec("set names utf8");

} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM helysegek");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $stmt = $conn->prepare("INSERT INTO helysegek (nev, orszag) VALUES (?, ?)");
    $stmt->execute([$data->nev, $data->orszag]);

    echo json_encode(["status" => "ok"]);
}

if ($method === 'DELETE') {
    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("DELETE FROM helysegek WHERE az = ?");
        $stmt->execute([$_GET['id']]);

        echo json_encode(["status" => "deleted"]);
    }
}
?>
