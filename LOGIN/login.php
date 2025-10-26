<?php

session_start();

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON
$data = json_decode(file_get_contents('php://input'), true);

$email = $data["email"];
$password = $data["password"];




//esta variable se enviará a js y se trabajará desde ahí en el archivo "loginAndRegister.js"
$message = [
  "data" => "undefined",
  "rol" => "undefined"
];

     //coneixion a la base de datos y demas
 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

 $sql = "SELECT * FROM usuario WHERE Email = :em";

 $stmt = $link->prepare($sql);

 $stmt->bindParam(":em",$email);
 $stmt->execute();
 
 if($stmt->rowCount() > 0){
         
         $result = $stmt->fetch(PDO::FETCH_ASSOC); //recupera el hash del campo clave de la bbdd
         $hash = $result["Contraseña"]; //la almacena el hash
         $password_hash = password_verify($password,$hash);//verifica si el hash pertenece a la clave
        //  $message = $password_hash;

         if($password_hash){
          //  session_start();
          $rol = $result["Rol"];

          $message = [
            "data" => "success",
            "rol" => $rol ?? "Cliente"
          ];
          
          //antes de mandar el veredicto, almaceno la CI del usuario
          $_SESSION["CI"] = $result["CiUsuario"];
          
          echo json_encode($message);
          //  $message = "success"; //equivalente a header("location: url") ya que esto se manda a JS y se trabaja ahí para mayor seguridad
         }

         if(!$password_hash){
          $message["data"] = "incorrect";
          $message["rol"] = $result["Rol"] ?? "undefined";
         }

        } 
        
        
        else {
          
          $message["data"]= "incorrect"; //mostrara un sms de "usario y/o calve incorrecta" con js en el obj ".message"
           echo json_encode($message);
     }


      
    
    







?>