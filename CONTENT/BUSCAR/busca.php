<?php


header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$title = $data["title"]; //esto funciona ;)

$obj = [
    "title" => $title
]; //esto funciona


echo json_encode($obj); //esto funciona ;)

?>