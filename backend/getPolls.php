<?php
session_start();

// äänestykset tietokannasta index-sivulle

if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
}
else {
    $user_id = false;
}

if (isset($_GET["all_votes"])) {
    $all_votes = true;
}
else {
    $all_votes = false;
}

include_once "db-connection.php";

try {
    // pdo statement

    if ($all_votes == true or $user_id == false) {
        $stmt = $conn->prepare("SELECT id, topic, start, end, user_id FROM poll");
    }
    else {
        $stmt = $conn->prepare("SELECT id, topic, start, end, user_id FROM poll WHERE user_id = :user_id");
        $stmt->bindParam(":user_id", $user_id);
    }

    if($stmt->execute() == false) {
        $data = array(
            "error" => "jokin virhe tapahtui!"
        );
    }

    else {
        //Käyttäjä löytyi
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $data = $result;
        }
}

catch (PDOException $e) {
    $data = array(
        "error" => "Virhe!"
    );
}

header("Content-type: application/json;charset=utf8");
echo json_encode($data);