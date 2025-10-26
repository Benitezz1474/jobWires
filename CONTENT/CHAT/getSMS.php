<?php
session_start();

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

// Obtengo los datos que me manda el fetch
$CiProveedor = $data["CiProveedor"];
$CiCliente = $data["CiCliente"] ?? $_SESSION["CI"];

// Esta es la clave del hash para utilizar en el openSSL
$key = "12345678901234567890123456789012"; // 32 caracteres (256bits)

 $link = new PDO("mysql:host=mariadb;dbname=proyectobd","root","admin");

try {
    
    // Esta función desencripta el mensaje de la BBDD
    function decryptMessage($encrypted, $key) {
        $cipher = "AES-256-CBC";
        $ivlen = openssl_cipher_iv_length($cipher);

        $data = base64_decode($encrypted);
        
        // Validar que el dato sea válido - AQUÍ YA NO HAY throw Exception
        if ($data === false || strlen($data) < $ivlen) {
            return $encrypted; // Retornar original si no se puede desencriptar
        }

        // Extraemos IV y ciphertext
        $iv = substr($data, 0, $ivlen);
        $ciphertext = substr($data, $ivlen);

        $decrypted = openssl_decrypt(
            $ciphertext,
            $cipher,
            $key,
            OPENSSL_RAW_DATA,
            $iv
        );

        // Si falla la desencriptación, retornar el mensaje original
        return $decrypted !== false ? $decrypted : $encrypted;
    }
    
    // Consulta para obtener mensajes entre cliente y proveedor (en ambas direcciones)
    $sql = "SELECT * FROM mensaje WHERE (emisor = ? AND receptor = ?) OR (emisor = ? AND receptor = ?) ORDER BY fecha ASC";
    
    $stmt = $link->prepare($sql);
    $stmt->bindParam(1, $CiCliente);
    $stmt->bindParam(2, $CiProveedor);
    $stmt->bindParam(3, $CiProveedor);
    $stmt->bindParam(4, $CiCliente);
    $stmt->execute();

    // Devolver los mensajes
    $messages = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $messageDecrypted = decryptMessage($row["contenido"], $key);
        
        $messages[] = array( //por cada registro (mensaje) obtengo un 
            "emisor" => $row["emisor"],
            "receptor" => $row["receptor"],
            "contenido" => $messageDecrypted, //obtengo el sms pero desencriptado
            "fecha" => $row["fecha"],
            "visualizacion" => $row["visualizacion"]
        );
    }

    echo json_encode(array( //le mando un array todo bonito si sale todo bien
        "success" => true,
        "messages" => $messages
    ));

} catch (PDOException $e) {
    echo json_encode(array( //le mando un array todo bonito si sale algo mal
        "success" => false,
        "error" => "Error al obtener mensajes: " . $e->getMessage()
    ));
} catch (Exception $e) {
    echo json_encode(array(
        "success" => false,
        "error" => "Error al desencriptar: " . $e->getMessage()
    ));
}
?>