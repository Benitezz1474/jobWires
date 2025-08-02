<?php 

//1) capturar los datos que envia JS
//2) validarlos
//3) realizar la consutla a la BBDD
//4) devolver un success/throwError

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

//obtengo el comentario
$coment = $data["coment"] ?? "undefined"; 
$id = $data["id"] ?? 0;
$date = $data["date"] ?? "undefined";
$id_service = $data["id_service"] ?? 0;

$message = "error";

//realizo la conexion a la BBDD
$link = new PDO("mysql:host=localhost;dbname=proyecto","root","admin");

$sql_comentario = "INSERT INTO comentarios VALUES (?,?,?)";
$stmt_comentario = $link->prepare($sql_comentario);
$stmt_comentario -> bindParam(1,$id);
$stmt_comentario -> bindParam(2,$coment);
$stmt_comentario -> bindParam(3, $date);
$stmt_comentario -> execute();

if($stmt_comentario -> rowCount() > 0) {
   
    $sql_comentario = null; //una vez insertado el comentario libero la sentencia para que no consuma recursos

    //y una vez insertado el comentario, con ese mismo ID debo insertarlo en la tabla de servicioComentario para que se guarde
    $sql_servicioComentario = "INSERT INTO servicioComentario VALUES (?,?)";
    $stmt_servicioComentario = $link->prepare($sql_servicioComentario);
    $stmt_servicioComentario -> bindParam(1, $id_service);
    $stmt_servicioComentario -> bindParam(2, $id);
    $stmt_servicioComentario -> execute();
    
    if($stmt_servicioComentario -> rowCount() > 0) {
        
            $message = "success";
            echo json_encode($message);

            exit();

    }

    echo json_encode ($message);

}

echo json_encode($message);

?>