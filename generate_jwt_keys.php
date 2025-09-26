<?php

$config = array(
    "digest_alg" => "sha256",
    "private_key_bits" => 2048,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
);

$res = openssl_pkey_new($config);

openssl_pkey_export($res, $privateKey);

$publicKey = openssl_pkey_get_details($res);
$publicKey = $publicKey["key"];

file_put_contents('config/jwt/private.pem', $privateKey);
file_put_contents('config/jwt/public.pem', $publicKey);

echo "JWT keys generated successfully!\n";
?>