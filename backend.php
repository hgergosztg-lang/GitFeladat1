<?php
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "ADATBAZIS_NEVE";
$username = "FELHASZNALONEV";
$password = "JELSZO";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM helysegek");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->nev) && !empty($data->orszag)) {
        $stmt = $conn->prepare("INSERT INTO helysegek (nev, orszag) VALUES (?, ?)");
        $stmt->execute([$data->nev, $data->orszag]);
    }
}

if ($method === 'DELETE') {
    if (isset($_GET['id'])) {
        $stmt = $conn->prepare("DELETE FROM helysegek WHERE az = ?");
        $stmt->execute([$_GET['id']]);
    }
}
?>
