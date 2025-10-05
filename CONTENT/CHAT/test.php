<?php

// --------------------
// FUNCION PARA ENCRIPTAR
// --------------------
function encryptMessage($plaintext, $key) {
    $cipher = "AES-256-CBC";
    $ivlen = openssl_cipher_iv_length($cipher);           // 16 bytes para CBC
    $iv = openssl_random_pseudo_bytes($ivlen);            // IV aleatorio

    $ciphertext = openssl_encrypt(
        $plaintext,
        $cipher,
        $key,
        OPENSSL_RAW_DATA,
        $iv
    );

    // Concatenamos IV + ciphertext y codificamos en base64
    return base64_encode($iv . $ciphertext);
}

// --------------------
// FUNCION PARA DESENCRIPTAR
// --------------------
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

// --------------------
// EJEMPLO DE USO
// --------------------
$key = "12345678901234567890123456789012"; // 32 caracteres = 256 bits
$mensaje = "Hola, este es un mensaje secreto";

// Encriptamos antes de guardar en la DB
$encrypted = encryptMessage($mensaje, $key);
echo "Encriptado: $encrypted\n";

// Desencriptamos al leer de la DB
$decrypted = decryptMessage($encrypted, $key);
echo "Desencriptado: $decrypted\n";
?>
