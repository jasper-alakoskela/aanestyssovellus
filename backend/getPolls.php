<?php
// äänestykset tietokannasta index-sivulle

include_once "db-connection.php";

try {
    // pdo statement
    $stmt = $conn->prepare("SELECT id, topic, start, end, user_id FROM poll");
    
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