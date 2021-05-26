<?php
session_start();

if (!isset($_GET["id"])) {
    header("Location: ../index.php");
}
$poll_id = $_GET["id"];

if (isset($_COOKIE["poll_$poll_id"])) {
    header("Location: ../results.php?id=$poll_id");
}

else {
    header("Location: ../vote.php?id=$poll_id");
}

