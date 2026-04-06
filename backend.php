<?php
header("Content-Type: application/json");
// A tárhelyed adatait ide írd be! [cite: 59, 60]
$host = "localhost";
$dbname = "adatbázis_neve";
$user = "felhasználónév";
$pass = "jelszó";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM helysegek");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO helysegek (nev, orszag) VALUES (?, ?)");
    $stmt->execute([$input['nev'], $input['orszag']]);
    echo json_encode(["status" => "ok"]);
}
?>
