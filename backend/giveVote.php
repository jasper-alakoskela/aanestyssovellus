<?php

if (!isset($_GET["id"])) {
    header("Location: ../index.php");
}

$option_id = $_GET["id"];

include_once "db-connection.php";

try {
    $stmt = $conn -> prepare("UPDATE option SET votes = votes +1 WHERE (id = :option_id);");
    $stmt->bindParam(":option_id", $option_id);

    if ($stmt->execute() == false) {
        $data = array (
            "error" => "Virhe"
        );
    }

    else {
        $data = array (
            "success" => "Äänestys onnistui"
        );
    }
}

catch (PDOException $e) {
    $data = array (
        "error" => "Virhe"
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);