// Register sivun toiminnallisuus

document.forms["register"].addEventListener("submit", registerNewUser);

function registerNewUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    const nameInput = document.getElementById("username");
    const pwdInput = document.getElementById("password");
    const pwd2Input = document.getElementById("password2");


    if (username.length <= 0) {
        setErrorFor(nameInput, 'Käyttäjänimi tarvitaan!');
        return false;
    }

    else {
        setSuccessFor(nameInput);
    }

    if (password.length < 6) {
        setErrorFor(pwdInput, 'Salasana liian lyhyt!')
        return false;
    }

    else {
        setSuccessFor(pwdInput);
    }

    if (password.localeCompare(password2) != 0) {
        setErrorFor(pwd2Input, 'Salasanat eivät täsmää!')
        return false;
    }

    else {
        setSuccessFor(pwd2Input);

    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty("success")) {
            showMessage("success", data.success);
        }
        else {
            showMessage("error", data.error);
        }
    }
    ajax.open("POST", "backend/registerNewUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`username=${username}&password=${password}`);
}

// Virhe viestit

function setErrorFor(input, message) {
    const div = input.parentElement;
    const small = div.querySelector('small');
    input.className = 'form-control is-invalid';
    small.innerText = message;
}

function setSuccessFor(input) {
    input.className = 'form-control is-valid';
}

// Viesti laatikko funktio

function showMessage(type, msg) {

    let msgBox = document.getElementById("msg");

    if (type == "success") {
        msgBox.classList.remove("alert-danger");
        msgBox.classList.add("alert-success");
    }

    else if (type == "error") {
        msgBox.classList.remove("alert-success");
        msgBox.classList.add("alert-danger");
    }
    msgBox.querySelector("p").innerHTML = msg;
    msgBox.classList.remove("d-none");
}
