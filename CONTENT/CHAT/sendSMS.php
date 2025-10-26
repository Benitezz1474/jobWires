<?php
session_start();

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"),true);

//Obtengo los datos que me manda el fetch
$CiProveedor = $data["CiProveedor"];
$CiCliente = $data["CiCliente"] ?? $_SESSION["CI"];
$message = $data["message"];

/*
IMPORTANTE: Lean esto con atención porque es complejo, es COMO se encriptan los mensjaes
antes de guardarse en la BBDD. CREA está caído y el material de encriptado del profe de linux no lo tengo
(tampoco se si está en crea, pero crea no funca.) asi que le tuve que pedir a la IA que me ayude con esto,
no es NADA del otro mundo PEEERO hay que saberlo y es importante (@lucas sobre todo vos).
*/

// Clave secreta (debe ser 32 bytes para AES-256)

$key = "12345678901234567890123456789012"; // 32 caracteres (256bits)

function encryptMessage($message, $key) {
    
    //Advanced Encryption Standard
    $cipher = "AES-256-CBC"; //con esto eligo QUÉ algoritmo de cifrado usar (AES), 
                            //el tamaño de la key(256) y el modo de cifrado (CBC)

    //acá elijo el largo del vector de inicialización por ser AES, es de 16 Bytes
    //basicamente le está diciendo a openssl cual va a ser el largo del de cada bloque despues del 1er bloque
    $ivlen = openssl_cipher_iv_length($cipher);
    
    $iv = openssl_random_pseudo_bytes($ivlen);

    // Cifrar
    $ciphertext = openssl_encrypt(
        $message,
        $cipher,
        $key,
        OPENSSL_RAW_DATA, //este parámetro convierte los datos a binario
        $iv
    );

    // Guardamos juntos: IV + texto
    return base64_encode($iv.$ciphertext); //esto retorna los datos (convertidos en binario) en base64(ascci)
}

$encryptedMessage = encryptMessage($message, $key); //mensaje encriptado

 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

//debo insertar el SMS en la tabla de SMS de la BBDD;
try{
    
//emisor,receptor,fecha,contenido,visualzizacion
$sql = "INSERT INTO mensaje VALUES (?,?,NOW(),?,?)";

$stmt = $link->prepare($sql);
$stmt -> bindParam(1,$CiProveedor);
$stmt -> bindParam(2,$CiCliente);
// $stmt -> bindParam(1,); //me lo salto y uso el NOW() function en su lugar 
$stmt -> bindParam(3,$encryptedMessage); //mensaje encriptado
$visualizacion = 0; // tinyint(1)
$stmt->bindParam(4, $visualizacion, PDO::PARAM_INT); //SEGUN chatGPT (si, lo usé para esto porque me daba error 500), así debe quedar.
$stmt->execute();


} catch(PDOException $e){

   echo json_encode("error Al Enviar el SMS: " . $e->getMessage());
}

finally{

    echo json_encode("Mensaje Enviado Correctamente!");
}



?>