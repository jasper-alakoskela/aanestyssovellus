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
  <a class="navbar-brand" href="#">Äänestyssovellus</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Koti
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features
        <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
  </div>
</nav>
<br>
<div class="container">
  <form name="register">
    <fieldset>
      <legend>Rekistöröinti</legend>
      <br>
      <div id="msg" class="alert alert-dismissible alert-danger d-none">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <p class="mb-0"></p>
      </div>
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
      <div class="form-group">
        <label for="password2">Salasanan tarkistus</label>
        <input type="password" class="form-control" id="password2" name="password2" placeholder="Salasana uudelleen">
        <small></small>
      </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Rekistöröidy</button>
    </fieldset>
  </form>

  <script src="js/register.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</div>
</body>
</html>
