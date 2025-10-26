<?php  

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = null;


//realizo la conexion a la BBDD
 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

$sql = " SELECT comentarios.texto AS comentarios
FROM servicio, comentarios, servicioComentario
WHERE servicio.IdServicio = servicioComentario.id_servicio AND
      comentarios.id = servicioComentario.id_comentario LIMIT 5";

$stmt = $link->query($sql);

if($stmt -> fetchColumn() > 0){

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $message = $result;

    echo json_encode($message);

}

else echo json_encode($message);


?>