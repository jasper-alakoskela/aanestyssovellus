<?php
if (!isset($_GET["id"])) {
    header("Location: ../index.php");
    die();
}

$poll_id = $_GET["id"];

include_once "db-connection.php";


try {
    $stmt = $conn -> prepare("SELECT id, topic, start, end, user_id FROM poll WHERE poll id = :poll_id");
    $stmt->bindParam(":poll_id", $poll_id);

    if ($stmt->execute() == false) {
        $data = array (
            "error" => "Virhe"
        );
    }

    else {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $data = $result;
    }
}

catch (PDOException $e) {
    $data = array (
        "error" => "Virhe"
    )
}

// vaihtoehdot tietokannasta
try {
    $stmt = $conn -> prepare("SELECT id, name, votes FROM option WHERE poll_id = :poll_id");
    $stmt->bindParam(":poll_id", $poll_id);

    if ($stmt->execute() == false) {
        $data = array (
            "error" => "Virhe"
        );
    }

    else {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $options = $result;
        $data["options"] = $options;
    }
}

catch (PDOException $e) {
    $data = array (
        "error" => "Virhe"
    )
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);