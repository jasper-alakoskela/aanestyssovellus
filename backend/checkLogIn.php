<?php
session_start();

if (!isset($_GET["id"])) {
    header("Location: ../index.php");
}
$poll_id = $_GET["id"];

if (isset($_SESSION["logged_in"])) {
    header("Location: ../vote.php?id=$poll_id");
}

else {
    header("Location: ../results.php?id=$poll_id");
}

