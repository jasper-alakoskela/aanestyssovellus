<?php

if (!isset($_GET["id"])) {
    header("Location: ../admin.php");
}

$poll_id = $_GET["id"];

include_once "db-connection.php";

try {
    $stmt = $conn -> prepare("DELETE FROM option WHERE poll_id = :poll_id;");
    $stmt->bindParam(":poll_id", $poll_id);

    if ($stmt->execute() == false) {
        $data = array (
            "error" => "Virhe"
        );
    }

    else {
        $data = array (
            "success" => "vaihtoehto poisto onnistui"
        );
    }

    $stmt = $conn -> prepare("DELETE FROM poll WHERE id = :poll_id;");
    $stmt->bindParam(":poll_id", $poll_id);

    if ($stmt->execute() == false) {
        $data = array (
            "error" => "Virhe"
        );
    }

    else {
        $data = array (
            "success" => "äänestys poisto onnistui"
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