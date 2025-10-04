<?php
session_start();

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"),true);

//Obtengo los datos que me manda el fetch
$CiProveedor = $data["CiProveedor"];
$CiCliente = $data["CiCliente"] ?? $_SESSION["CI"];
// $message = $data["message"];


//esta es la clave del hash para utiliazar en el openSSL
$key = "12345678901234567890123456789012"; // 32 caracteres (256bits)


$link = new PDO("mysql:host=localhost;dbname=proyectobd","root","admin");

//debo insertar el SMS en la tabla de SMS de la BBDD;
try{


//esta funcion desencripta el mensaje de la BBDD
// function decryptMessage($ciphertext, $key, $iv) {
//     $cipher = "AES-256-CBC";
//     return openssl_decrypt($ciphertext, $cipher, $key, OPENSSL_RAW_DATA, $iv);
// }


function decryptMessage($encrypted, $key) {
    $cipher = "AES-256-CBC";
    $ivlen = openssl_cipher_iv_length($cipher);

    $data = base64_decode($encrypted);
    if (strlen($data) < $ivlen) {
        throw new Exception("El dato cifrado es demasiado corto para contener el IV.");
    }

    // Extraemos IV y ciphertext
    $iv = substr($data, 0, $ivlen);
    $ciphertext = substr($data, $ivlen);

    return openssl_decrypt(
        $ciphertext,
        $cipher,
        $key,
        OPENSSL_RAW_DATA,
        $iv
    );
}
    
//emisor,receptor,fecha,contenido,visualzizacion
$sql = "SELECT * FROM mensaje WHERE emisor = ? AND receptor = ?";

$stmt = $link->prepare($sql);
$stmt -> bindParam(1,$CiCliente);
$stmt -> bindParam(2,$CiProveedor);
$stmt->execute();

//devolver el sms

$result = ""; //en esta variable tengo que guardar todos los sms del usuario

while($row = $stmt->fetch(PDO::FETCH_ASSOC)){//mientras haya registros (puntero interno)

    $messageNoCripty = decryptMessage($row["contenido"], $key);//esto desencrypta los mensajes
    $result = $result . $messageNoCripty; //almaceno en "result";
}

echo json_encode($result);


}catch(PDOException $e){

   echo json_encode("error Al Enviar el SMS: " . $e->getMessage());
}

finally{

    echo json_encode("Mensaje Enviado Correctamente!");
}

?>
