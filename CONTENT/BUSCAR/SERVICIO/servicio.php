<?php  

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = [
    "data" => "undefined",
    "error" => false
];

$idServicio = $data["id"];

//realizo la conexion a la BBDD
$link = new PDO("mysql:host=localhost;dbname=proyecto","root","admin");

$sql = "SELECT * FROM servicio WHERE IdServicio = ?";

$stmt = $link->prepare($sql);
$stmt -> bindParam(1,$idServicio);
$stmt -> execute();

if($stmt -> rowCount() > 0){

    $service = $stmt -> fetch(PDO::FETCH_ASSOC);

    $message = $service;

    echo json_encode($message);

}

else echo json_encode($message);


?>