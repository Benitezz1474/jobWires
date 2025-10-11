<?php 

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = "";

try{
$link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

$id = $data["id"] ?? 10;

$sql="SELECT 
    u.CiUsuario AS CI,
    u.Nombre,
    u.Apellido,
    u.Email,
    c.FechaHora AS FechaContratacion,
    c.Comentario,
    c.Puntaje
FROM Contrata c
INNER JOIN Cliente cli ON c.CiCliente = cli.CiCliente
INNER JOIN Usuario u ON cli.CiCliente = u.CiUsuario
WHERE c.IdPublicacion = ?; -- cambia el número por el IdPublicacion que quieras ver
"
;

$stmt = $link -> prepare($sql);
$stmt -> bindParam(1,$id);
$stmt -> execute();

if($stmt->rowCount() > 0){

    $message = $stmt->fetchAll();
}


} catch(PDOException $e){

    $message = "error al obtener registros: " . $e->getMessage();
}

finally{
    $link = null;
    $stmt = null;
    echo json_encode($message);
}



?>