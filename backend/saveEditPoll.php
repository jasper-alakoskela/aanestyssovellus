<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    $data = array(
        "error" => "Pääsy kielletty!"
    );
    header("Content-type: application/json;charset=utf-8");
    echo json_encode($data);
    die();
}

$json = file_get_contents("php://input");
$pollData = json_decode($json);
$data = array();

include_once "db-connection.php";

//Päivitä tietoja
try {
    $stmt = $conn->prepare("UPDATE poll SET topic = :topic, start = :start, end = :end WHERE id = :id;");
    $stmt->bindParam(":topic", $pollData->topic);
    $stmt->bindParam(":start", $pollData->start);
    $stmt->bindParam(":end", $pollData->end);
    $stmt->bindParam(":id", $pollData->id);

    if ($stmt->execute() == false) {
        $data["error"] = "Muokkaus epäonnistui";
    }
    else{
        $data["success"] = "Muokkaus onnistui";  
    }
}
catch (PDOException $e) {
    $data["error"] = $e->getMessage();
}

try {
//Päivitetään vaihtoehdot
    foreach ($pollData->options as $option) {
        if (isset($option->id)) {
            $stmt = $conn->prepare("UPDATE option SET name = :name WHERE id = :id;");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":id", $option->id);
        }
        else {
            $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :poll_id)");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":poll_id", $pollData->id);
        }

        if ($stmt->execute() == false) {
            $data["error"] = "Muokkaus epäonnistui";
        }
        else{
            $data["success"] = "Muokkaus onnistui";  
        }
    }
}
catch (PDOException $e) {
    $data["error"] = $e->getMessage();
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);
