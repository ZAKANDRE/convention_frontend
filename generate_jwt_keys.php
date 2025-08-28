<?php
// generate_jwt_keys.php
$config = array(
    "digest_alg" => "sha256",
    "private_key_bits" => 2048,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
);

// Створюємо ключову пару
$res = openssl_pkey_new($config);

// Отримуємо приватний ключ
openssl_pkey_export($res, $privateKey);

// Отримуємо публічний ключ
$publicKey = openssl_pkey_get_details($res);
$publicKey = $publicKey["key"];

// Зберігаємо ключі
file_put_contents('config/jwt/private.pem', $privateKey);
file_put_contents('config/jwt/public.pem', $publicKey);

echo "JWT keys generated successfully!\n";
?>