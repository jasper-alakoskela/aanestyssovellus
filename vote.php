<?php session_start();?>
<?php
if (!isset($_GET["id"])) {
    header("Location: index.php");
}

$id = intval($_GET["id"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Äänestyssovellus</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>
    
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="index.php">Äänestyssovellus</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="index.php">Koti</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="register.php">Rekisteröinti</a>
      </li>
      <?php if (isset($_SESSION["logged_in"])): ?>
      <li class="nav-item">
        <a class="nav-link" href="logout.php">Kirjaudu ulos</a>
      </li>
      <?php else:?>
      <li class="nav-item">
        <a class="nav-link" href="login.php">Kirjaudu</a>
      </li>
      <?php endif;?>
      <?php if (isset($_SESSION["logged_in"])):?>
      <li class="nav-item">
        <a class="nav-link" href="newpoll.php">Luo äänestys</a>
      </li>
      <?php else:?>
        <li class="nav-item ">
        <a class="nav-link disabled" href="">Luo äänestys</a>
      </li>
      <?php endif;?>
      <?php if (isset($_SESSION["logged_in"])):?>
      <li class="nav-item">
        <a class="nav-link" href="admin.php">Muokkaa</a>
      </li>
      <?php else:?>
        <li class="nav-item ">
        <a class="nav-link disabled" href="">Muokkaa</a>
      </li>
      <?php endif;?>
    </ul>
  </div>
</nav>

<div class="container">
    <div class="jumbotron">

    <div class="container">
      <div id="msg" class="alert alert-dismissible alert-danger d-none">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <p class="mb-0"></p>
      </div>

        <h2></h2>
        <ul id="optionsUl" class="list-group">
        <!--
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-info btn-lg btn-primary btn-block" type="button">Vaihtoehto</button>
            </li>
            -->
        </ul>
    </div>
</div>

<script src="js/vote.js"></script>
<script src="js/functions.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<body>