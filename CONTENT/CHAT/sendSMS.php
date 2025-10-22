<?php

header("content-type : application/json");
$data = json_decode(file_get_contents("php://input"),true);

session_start();

$ci = $_SESSION["CI"];

$link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

$message = "";

//debo insertar el SMS en la tabla de SMS de la BBDD;

$sql = "INSERT INTO mensaje VALUES (?,?)";

?>