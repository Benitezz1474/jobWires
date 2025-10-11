<?php

session_start();

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$CI = $_SESSION["CI"];
$service = "";

try{

//   $CI = $data["CI"];

  $link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

  $sql = "SELECT * FROM publicacion WHERE CiProveedor = ?";

  $stmt = $link -> prepare($sql);
  $stmt -> bindParam(1,$CI);
  $stmt -> execute();

  if($stmt -> rowCount() > 0){
    
    $service = $stmt -> fetchAll(PDO::FETCH_ASSOC);

  }

} catch(PDOException $e){

    $service = "Error al traer los servicios" . $e->getMessage(); 

}finally{

    echo json_encode($service);
}
?>