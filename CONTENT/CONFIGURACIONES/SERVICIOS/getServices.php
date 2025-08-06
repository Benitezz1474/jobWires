<?php

session_start();

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = "error";

try{
$link = new PDO("mysql:host=localhost;dbname=proyecto","root","admin");
$sql = "SELECT s.* 
        FROM contrata c
        JOIN servicio s ON c.IdServicio = s.IdServicio
        WHERE c.IdCliente = ?";

$stmt = $link -> prepare($sql);
$stmt -> bindParam(1,$_SESSION["CI"]);
$stmt -> execute();

if($stmt->rowCount() > 0){
    $services = $stmt -> fetchAll(PDO::FETCH_ASSOC); //guardo la informacion en la variable sms
    $message = $services;
}

 else $message = "no_found";

} catch(PDOException $e){
     $message = "error";
}

finally{
    $link = null;
    $stmt = null;
    echo json_encode($message);
}







?>