<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Äänestyssovellus</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>
    
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="index.php">Äänestyssovellus</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
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
      <li class="nav-item active">
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

<div class="jumbotron">
    <h2 class="display-3">Tervetuloa hallintaan</h2>
    <?php if (isset($_SESSION["logged_in"])){ ?>
    <h3><?php echo $_SESSION["username"]; ?></h3>
    <?php } ?>
</div>

<div class="container">
      <div id="msg" class="alert alert-dismissible alert-danger d-none">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <p class="mb-0"></p>
      </div>

      <h2>Äänestykset</h2>
      <br>
      <div class="btn-group dropright">
          <button onclick="showPolls(data,'current')" class="btn btn-secondary btn-success btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Nykyiset
          </button>
          <div class="dropdown-menu">
            <ul id="currentVotes" class="ulvotes">
            </ul>
          </div>
      </div>
     <br><br>
      <div class="btn-group dropright">
          <button onclick="showPolls(data,'future')" class="btn btn-secondary btn-info btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Tulevat
          </button>
          <div class="dropdown-menu">
            <ul id="futureVotes" class="ulvotes">
            </ul>
          </div>
      </div>
      <br><br>
      <div class="btn-group dropright">
          <button onclick="showPolls(data,'old')" class="btn btn-secondary btn-danger btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menneet
          </button>
          <div class="dropdown-menu">
            <ul id="oldVotes" class="ulvotes">
            </ul>
          </div>
      </div>
</div>

<script src="js/admin.js"></script>
<script src="js/functions.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>