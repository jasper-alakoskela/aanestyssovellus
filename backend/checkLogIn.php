<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    $data = array(
        "error" => "Pääsy kielletty!"
    );
    die();
}
