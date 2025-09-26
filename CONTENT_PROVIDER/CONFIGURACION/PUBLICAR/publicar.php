<?php
session_start(); //inicio session para capturar la CI

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$CI = $_SESSION["CI"];
$title = $data["title"];
$price = $data["price"];
$description = $data["description"];
$ubication = $data["ubication"];

//relizar la conexion la BBDD

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = "null";

//IMPORTANTE: 
// 1) Necesitas la tabla ofrece de leandro
// 2) Preguntar si ese proveedor YA tiene ese servicio
// 3) Insertar el servicio 

try{


 $link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

//INSERTAR EN SERVICIO
$sql = "INSERT INTO publicacion (Titulo,Descripcion,Precio,Ubicacion,FechaPublicacion,CiProveedor) VALUES 
       (:Titulo,:Descripcion,:Price,:Ubicacion,NOW(),:Ci)";

 $stmt = $link->prepare($sql);

 $stmt->bindParam(":Titulo",$title);
 $stmt->bindParam(":Descripcion",$description);
 $stmt->bindParam(":Price",$price);
 $stmt->bindParam(":Ubicacion",$ubication);
 $stmt->bindParam(":Ci",$CI);

 $stmt->execute();

 $sql = null;

//INSERTAR EN OFRECE
$sql_ofrece = "INSERT INTO ofrece (ciProveedor) VALUES (?)";
$stmt_ofrece = $link->prepare($sql_ofrece);
$stmt_ofrece -> bindParam(1,$CI);
$stmt_ofrece->execute();


//CIERRO TODAS LAS CONEXIONES Y DEMAS
$link = null;
$stmt = null;
$stmt_client = null;
$stmt_insert = null;
$stmt_ofrece = null;


 //SI YA TENES LA TABLA DE LEANDRO ENTONCES HACELO
 
//  if($stmt->rowCount() < 1){
//     //insertar

//     //esta consulta se le debe asignar un rol para insertar en la BBDD
//     $sql_insert = "INSERT INTO usuario (CiUsuario,Rol,Nombre,Apellido,Email,Contraseña) VALUES (?,?,?,?,?,?)";

//     $stmt_insert = $link->prepare($sql_insert);
//     $stmt_insert->bindParam(1,$CI);
//     $stmt_insert->bindParam(2,$rol);
//     $stmt_insert->bindParam(3,$name);
//     $stmt_insert->bindParam(4,$surname);
//     $stmt_insert->bindParam(5,$email);
//     $stmt_insert->bindParam(6,$password_prepare);

  
//     $stmt_insert->execute();
    
//     // DEBO INSERTAR EN LA TABLA CLIENTE ANTES DE HACER EL ECHO JSONENCODE
    
//     $stmt_insert = null;
    
//     $sql_insert_client = "INSERT INTO cliente VALUES (?)";
//     $stmt_client = $link->prepare($sql_insert_client);
//     $stmt_client->bindParam(1,$CI);
//     $stmt_client->execute();
    

   $message = "success";
//  }

// else  if($stmt->rowCount() > 0){
//   $message = "user_exist";
// }

} catch (PDOexception $e){
   
    $message = "error al conectar con la bdd: " . $e->getMessage();
}
finally{
    echo json_encode($message);
}

//INSERTAR :)

// echo json_encode("success");//funciona :)


?>