<?php


header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$title = $data["title"]; //esto funciona ;)

    //conexiones y demas
    // $link = new PDO("mysql:host=localhost;dbname=clientes","root","admin");
    // $sql = "SELECT * FROM ofertas WHERE title = ?";
    // $stmt = $link-prepare($sql);
    // $stmt= $link->bindParam(1,$title);
    // $stmt= $execute();

$obj = [
    "title" => $title
]; //esto funciona

echo json_encode($obj);



?>