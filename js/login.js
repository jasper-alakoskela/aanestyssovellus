
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const nameInput = document.getElementById("username");
    const pwdInput = document.getElementById("password");


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