<?php 

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = "error";

try{
 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");
$sql = "DELETE FROM publicacion WHERE IdPublicacion = ?";

$stmt = $link -> prepare($sql);
$stmt -> bindParam(1,$data["id"]);
$stmt -> execute();

if($stmt->rowCount() > 0){
    $message = "success";
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