<!DOCTYPE html>
<html lang="en">
<head>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Viestiseinä</title>
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
        <a class="nav-link" href="index.php">Koti
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="register.php">Rekisteröinti</a>
      </li>
      <?php if (isset($_SESSION["logged_in"])): ?>
      <li class="nav-item active">
        <a class="nav-link" href="logout.php">Kirjaudu ulos <span class="sr-only">(current)</span></a>
      </li>
      <?php else:?>
      <li class="nav-item active">
        <a class="nav-link" href="login.php">Kirjaudu <span class="sr-only">(current)</span></a>
      </li>
      <?php endif;?>
      <li class="nav-item">
      <a class="nav-link" href="newpoll.php">Luo äänestys</a>
      </li>
    </ul>
  </div>
</nav>
<br>
<div class="container">
  <form name="login">
    <fieldset>
      <legend>Kirjautuminen</legend>
      <br>
      
      <div class="form-group">
        <label for="name">Käyttäjänimi</label>
        <input type="text" class="form-control" id="username" name="username" placeholder="Syötä Nimi">
        <small></small>
      </div>
      <div class="form-group">
        <label for="password">Salasana</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Syötä Salasana">
        <small></small>
      </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Kirjaudu</button>
    </fieldset>
  </form>
</div>

<script src="js/login.js"></script>
<script src="js/functions.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>
