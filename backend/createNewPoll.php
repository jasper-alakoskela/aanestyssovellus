<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    $data = array(
        "error" => "Pääsy kielletty!"
    );
    die();
}

    // Tarkistukset ensin
if (!isset($_POST["topic"]) or !isset($_POST["option1"])) {
    $data = array(
        "error" => "Dataa ei saatavilla!"
    );
    die();
}

$topic = $_POST["topic"];
$start = $_POST["start"];
$end = $_POST["end"];
$user_id = $_SESSION["user_id"];

include_once "db-connection.php";

try {
    // pdo statement
$stmt = $conn->prepare("INSERT INTO poll (topic, start, end, user_id) VALUES (:topic, :start, :end, :user_id);");
$stmt->bindParam(":topic", $topic);
$stmt->bindParam(":start", $start);
$stmt->bindParam(":end", $end);
$stmt->bindParam(":user_id", $user_id);
if($stmt->execute() == false) {
    $data = array(
        "error" => "Tallennus epäonnistu!"
    );
}
else {
    $data = array(
        "success" => "Uusi äänestys luotu!"
    );
    } 
}
    catch(PDOException $e) {
        $data = array(
            "error" => "Tapahtui Virhe!"
        );
    }

    $options = array();

    foreach ($_POST as $key => $value) {
    if (substr($key, 0, 6) == "option") {
        $options[] = $value;
    }
}

    $poll_id = $conn->lastInsertId();
    //$_SESSION["poll_id"] = $poll_id;
    try {
        foreach($options as $option) {
            // pdo statement
            $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :poll_id);");
            $stmt->bindParam(":name", $option);
            $stmt->bindParam(":poll_id", $poll_id);

            if ($stmt->execute() == false) {
                $data = array(
                    "error" => "Tallennus epäonnistu!"
                );
            }
            else {
                $data = array(
                    "success" => "Uusi äänestys luotu!" 
                );
                //$_SESSION["poll_id"] = $poll_id;
            }
        }
    }
        
    catch(PDOException $e) {
        $data = array(
                "error" => "Tapahtui Virhe!"
            );
        }

header("Content-type: application/json;charset=utf8");
echo json_encode($data);
