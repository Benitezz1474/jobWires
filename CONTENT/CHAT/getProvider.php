<?php 

try{
 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

    $sql = "SELECT usuario.Nombre
            FROM usuario,proveedor,publicacion
            WHERE usuario.CiUsuario = proveedor.CiProveedor AND
                  publicacion.IdPu
                  
    "

}catch(PDOException $e){

}finally{

}


?>