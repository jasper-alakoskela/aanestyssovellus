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
      <li class="nav-item ">
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
      <li class="nav-item active">
        <a class="nav-link" href="newpoll.php">Luo äänestys</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container">
  <form name="newpoll">
    <fieldset>
      <legend>Luo taulu</legend>
      <br>
      <div id="msg" class="alert alert-dismissible alert-danger d-none">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <p class="mb-0"></p>
      </div>
      <div class="form-group">
        <label for="topic">Aihe</label>
        <input type="text" class="form-control" id="topic" name="topic" placeholder="Kirjoita Aihe">
        <small></small>
      </div>
      <div class="form-group">
        <label for="startvote">Valitse Aloitus Aika</label>
        <input type="datetime-local" class="form-control" id="startvote" name="startvote">
        <small></small>
      </div>
      <div class="form-group">
        <label for="endvote">Valitse Lopetus Aika</label>
        <input type="datetime-local" class="form-control" id="endvote" name="endvote">
        <small></small>
      </div>
      <h3>Vaihtoehdot</h3>
      <br>
      <button class="btn btn-primary" id="addoption">Lisää Vaihtoehto</button>
      <br><br>
      <div class="form-group">
        <label for="option1">Vaihtoehto1</label>
        <input type="text" class="form-control" id="option1" name="option1" placeholder="Vaihtoehto1">
        <small></small>
      </div>
      <div class="form-group">
        <label for="option2">Vaihtoehto2</label>
        <input type="text" class="form-control" id="option2" name="option2" placeholder="Vaihtoehto2">
        <small></small>
      </div>
      <!-- Tähän lisä vaihtoehdot -->
      <button type="submit" class="btn btn-primary">Rekistöröidy</button>
    </fieldset>
  </form>
  <div>
<script src="js/newPoll.js"></script>
<script src="js/functions.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>