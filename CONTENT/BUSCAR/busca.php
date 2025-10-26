<?php


header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

//obtengo los filtros de busqueda y los preparo (mas adelante)
$title = $data["title"] ?? "tecnico"; 
$ubicacion = $data["zona"] ?? "sayago";
// $categoria = $data["categoria"] ?? "electricista";
// $calificacion = $data["calificacion"] ?? 5;

//variable que se devuelve al lado del cliente
$message = "error";

try{
//realizo la conexion a la BBDD
 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

//creo la consulta con los filtros
// $sql = "SELECT * FROM servicio WHERE titulo = :titulo AND Ubicacion = :Ubicacion";
$sql = "SELECT * FROM publicacion WHERE Titulo LIKE :titulo";

//PHP no permite el ingreso de caracteres SQL especiales directamente, por eso agrego
//estas variables de este modo
$title_param = "%" . $title . "%";
$ubicacion_para = "%" . $ubicacion . "%";



//consulta preparada...
$stmt = $link -> prepare($sql);
$stmt -> bindParam(":titulo", $title_param);
// $stmt -> bindParam(":Ubicacion",$precio);
// $stmt -> bindParam(":Descripcion",$categoria);
//envio
$stmt -> execute();
//pregunto si existen resultados
if($stmt->rowCount() > 0){
    $message = $stmt -> fetchAll(PDO::FETCH_ASSOC); //guardo la informacion en la variable sms
}

 else $message = "no_found";

} catch(PDOException $e){
     $message = "error";
}

finally{
    //libero recursos y envío los resultados a js
    $link = null;
    $stmt = null;
    echo json_encode($message);
}



// $obj = [
//     [
//          "title" => $title,
//          "categoria" => $categoria;
//          "zona" => $zona,
//          "calificacion" => $calificacion
//     ],
//      [
//          "title" => "ingeniero",
//          "zona" => "peñarol",
//          "calificacion" => "2"
//     ],
// ];


//echo json_encode($obj); //esto funciona ;)//

?>