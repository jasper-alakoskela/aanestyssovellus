<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    $data = array(
        "error" => "Pääsy kielletty!"
    );
    die();
}

if (!isset($_GET["id"])) {
    header("Location: ../index.php");
}

$option_id = $_GET["id"];
$user_id = $_SESSION["user_id"];
$poll_id = $_SESSION["poll_id"];

include_once "db-connection.php";

$data = array();

try {
    $stmt = $conn->prepare("SELECT id, start, end FROM poll WHERE id = (SELECT poll_id FROM option WHERE id = :option_id);");
    $stmt->bindParam(":option_id", $option_id);

    if ($stmt->execute() == false) {
        $data["error"] = "virhe";
    }

    else {
        $poll = $stmt->fetch(PDO::FETCH_ASSOC);
        $poll_id = $poll["id"];

        $current_timestamp = time();
        $start_timestamp = strtotime($poll["start"]);
        $end_timestamp = strtotime($poll["end"]);

        /*if () {
            $data["warning"] = "Olet jo äänestänyt!";
        }*/
        
        if ($end_timestamp == $start_timestamp) {
            $data["success"] = "Aikaa ei määritelty";
        }
        else if ($end_timestamp < $current_timestamp) {
            $data["warning"] = "Äänestys on vanhentunut";
        }
        else if ($start_timestamp > $current_timestamp) {
            $data["warning"] = "Äänestys ei ole vielä voimassa";
        }
    }

    if (!array_key_exists("warning",$data)) {
        $stmt = $conn -> prepare("UPDATE option SET votes = votes +1 WHERE (id = :option_id);");
        $stmt->bindParam(":option_id", $option_id);
    
        if ($stmt->execute() == false) {
            $data["error"] = "Äänestys epäonnistui";
        }
    
        else {
            $data["success"] = "Äänestys onnistui";
            $stmt = $conn->prepare("INSERT INTO votes (user_id, poll_id) VALUES (:user_id, :poll_id);");
            $stmt->bindParam(":user_id", $user_id);
            $stmt->bindParam(":poll_id", $poll_id);

            if($stmt->execute() == false) {
                $data = array(
                    "error" => "käyttäjän äänestykset error!"
                );
            }
            else {
                $data = array(
                    "success" => "käyttäjän äänestykset succes!"
                );
            } 
        }
    }
}    


catch (PDOException $e) {
    $data = array (
        "error" => "Virhe"
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);