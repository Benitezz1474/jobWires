<?php

session_start();

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = "error";

try{
$link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

$sql = "SELECT 
    m.CiProveedor,
    c.CiCliente,
    u.Nombre AS NombreCliente,
    p.IdPublicacion,
    p.Titulo AS Servicio
FROM contrata ct, cliente c, publicacion p, usuario u, proveedor m
WHERE ct.CiCliente = c.CiCliente
  AND ct.IdPublicacion = p.IdPublicacion
  AND c.CiCliente = u.CiUsuario
  AND c.CiCliente = ?
ORDER BY ct.FechaHora DESC";


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