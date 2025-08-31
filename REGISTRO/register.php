<?php 
session_start(); //inicio una sesion

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON (configurarcion)
$data = json_decode(file_get_contents('php://input'), true); //obtengo los datos JSON y los trabajo como array_assoc

$message = [
    "data" => "undefined",
    "rol" => "undefined"
];


try{

    $CI = $data["CI"];
    $name = $data["name"];
    $surname = $data["surname"];
    $email = $data["email"];
    $password = $data["password"];
    $rol = $data["rol"] ?? "Cliente";
    $password_prepare = password_hash($password,PASSWORD_DEFAULT); //clave encriptada
    
    //guardo el nombre de la persona y la CI
    $_SESSION["CI"] = $CI;
    $_SESSION["name"] = $name;

 $link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

 $sql = "SELECT * FROM usuario WHERE Email = :em";

 $stmt = $link->prepare($sql);

 $stmt->bindParam(":em",$email);
 $stmt->execute();
 
 if($stmt->rowCount() < 1){
    //insertar

    //esta consulta se le debe asignar un rol para insertar en la BBDD
    $sql_insert = "INSERT INTO usuario (CiUsuario,Rol,Nombre,Apellido,Email,Contraseña) VALUES (?,?,?,?,?,?)";

    $stmt_insert = $link->prepare($sql_insert);
    $stmt_insert->bindParam(1,$CI);
    $stmt_insert->bindParam(2,$rol);
    $stmt_insert->bindParam(3,$name);
    $stmt_insert->bindParam(4,$surname);
    $stmt_insert->bindParam(5,$email);
    $stmt_insert->bindParam(6,$password_prepare);

  
    $stmt_insert->execute();
    
    // DEBO INSERTAR EN LA TABLA CLIENTE ANTES DE HACER EL ECHO JSONENCODE
    
    $stmt_insert = null;
    
    $sql_insert_client = "INSERT INTO cliente VALUES (?)";
    $stmt_client = $link->prepare($sql_insert_client);
    $stmt_client->bindParam(1,$CI);
    $stmt_client->execute();
    
    
        $message = [
            "data" => "success",
            "rol" => $rol ?? "client"
        ];
 }

else  if($stmt->rowCount() > 0){
  $message["data"] = "user_exist";
}

} catch (PDOexception $e){
   
    $message["data"] = "error al conectar con la bdd: " . $e->getMessage();
}
finally{

    $message["rol"] = $rol ?? "client";
    echo json_encode($message);
}

?>