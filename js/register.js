// Register sivun toiminnallisuus

document.forms["register"].addEventListener("submit", registerNewUser);


function registerNewUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    let nameInput = document.getElementById("username");
    let pwdInput = document.getElementById("password");
    let pwd2Input = document.getElementById("password2");


    if (username.length <= 0) {
        setErrorFor(nameInput, 'Käyttäjänimi tarvitaan!');
        const small = formControl.querySelector('small');
        small.innerText = message;
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
    }

    else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
        return;
    }

    if (password.length < 6) {
        pwdInput.classList.remove("is-valid");
        pwdInput.classList.add("is-invalid");
    }

    else {
        pwdInput.classList.remove("is-invalid");
        pwdInput.classList.add("is-valid");
        return;
    }

    if (password.localeCompare(password2) != 0) {
        pwd2Input.classList.remove("is-valid");
        pwd2Input.classList.add("is-invalid");
    }

    else {
        pwd2Input.classList.add("is-valid");
        pwd2Input.classList.remove("is-invalid");
        return
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty("success")) {
            window.open("login.php");
        }
        else {
            showMessage("error", data.error);
        }
    }
    ajax.open("POST", "backend/registerNewUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("username=" + username + "&password=" + password);
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
}

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
