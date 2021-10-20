<?php
session_start();

if (!isset($_GET["id"])) {
    header("Location: ../index.php");
}

$option_id = $_GET["id"];

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

        $cookie_name = "poll_$poll_id";
        if (isset($_COOKIE[$cookie_name])){
            $data["warning"] = "Olet jo äänestänyt";
        }
        elseif ($end_timestamp == $start_timestamp) {
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
        $stmt = $conn -> prepare("UPDATE option SET votes = votes + 1 WHERE (id = :option_id);");
        $stmt->bindParam(":option_id", $option_id);
    
        if ($stmt->execute() == false) {
            $data["error"] = "Äänestys epäonnistui";
        }
        else {
            $data["success"] = "Äänestys onnistui";

            $cookie_name = "poll_$poll_id";
            $cookie_value = 1;
            setcookie($cookie_name, $cookie_value, time() + (86400*30), "/");
        }
    }
}    
catch (PDOException $e) {
    $data = array (
        "error" => "pdo Virhe"
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);