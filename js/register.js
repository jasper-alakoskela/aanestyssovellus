// Register sivun toiminnallisuus

document.forms["register"].addEventListener("submit", registerNewUser);


function registerNewUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password.localeCompare(password2) != 0) {
        alert("Salasanat eivät täsmää!");
        return;
    }

    if (username.length <= 0) {
        alert("Käyttäjänimi tarvitaan!");
        return;
    }

    if (password.length < 6) {
        alert("Salasana liian lyhyt!");
        return;
    }
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        console.log(ajax.responseText)
    }
    ajax.open("POST", "backend/registerNewUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("username=" + username + "&password=" + password);
}