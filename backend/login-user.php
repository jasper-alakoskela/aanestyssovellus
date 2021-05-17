<?php
session_start();

// Tarkistukset ensin
if (!isset($_POST["username"]) or !isset($_POST["password"])) {
    $data = array(
        "error" => "Dataa ei saatavilla!"
    );
    die();
}

$username = $_POST["username"];
$password = $_POST["password"];

include_once "db-connection.php";

try {
    // pdo statement
    $stmt = $conn->prepare("SELECT id, username, pwd FROM user WHERE username  = :username");
    $stmt->bindParam(":username", $username);

    if($stmt->execute() == false) {
        $data = array(
            "error" => "Tallennus epäonnistu!"
        );
    } else {
        //Käyttäjä löytyi
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $result["pwd"])) {
            $data = array(
                "success" => "Kirjautuminen onnistui!"
            );  
            $_SESSION["logged_in"] = true;
            $_SESSION["user_id"] = $result["id"];
            $_SESSION["username"] = $result["username"];
        }
        else {
            $data = array(
                "error" => "Salasana on väärä"
            );
        } 
    } 
} catch (PDOException $e) {
    $data = array(
        "error" => "Virhe tallennuksessa!"
    );
}

header("Content-type: application/json;charset=utf8");
echo json_encode($data);