<?php 
session_start();

header("Content-type: application/json");
$data = json_decode(file_get_contents("php://input"),true);

$idService = $data["idService"] ?? "undefined";
$CI = $_SESSION["CI"] ?? 101;

$message = "error";

// $link = new PDO("mysql:host=localhost;dbname=proyecto","root","admin");

// $sql = "SELECT * FROM cliente WHERE idCliente = ?";

// $sql = "INSERT INTO contrata VALUES (?,?)";
// $stmt = $link->prepare($sql);
// $stmt->bindParam(1,$CI);
// $stmt->bindParam(2, $idService);
// $stmt->execute();

// if($stmt -> rowCount() > 0) {

//     $message = "success";
//     echo json_encode($message);
// }

echo json_encode($message);






?>