<?php
// Tarkistukset ensin
if (!isset($_POST["username"]) or !isset($_POST["password"])) {
    $data = array(
        "error" => "Dataa ei saatavilla!"
    );
    die();
}

$username = $_POST["username"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

include_once "db-connection.php";

try {
    // pdo statement
$stmt = $conn->prepare("INSERT INTO user (username, pwd) VALUES (:username, :pwd);");
$stmt->bindParam(":username", $username);
$stmt->bindParam(":pwd", $password);
if($stmt->execute() == false) {
    $data = array(
        "error" => "Tallennus epäonnistu!"
    );
}
else {
    $data = array(
        "success" => "Käyttäjä tallennettu!"
    );
    } 
}

catch(PDOException $e) {
    if (strpos($e->getMessage(), "1062 Duplicate entry")) {
        $data = array(
            "error" => "Käyttäjänimi on jo olemassa!"
        );
    }

    else {
        $data = array(
            "error" => "Virhe tallennuksessa!"
        );
    }
}

header("Content-type: application/json;charset=utf8");
echo json_encode($data);
