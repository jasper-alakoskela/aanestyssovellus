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
        msgBox.classList.remove("alert-warning");
        msgBox.classList.add("alert-success");
    }
    else if (type == "warning") {
        msgBox.classList.remove("alert-success");
        msgBox.classList.remove("alert-danger");
        msgBox.classList.add("alert-warning");
    }
    else if (type == "error") {
        msgBox.classList.remove("alert-success");
        msgBox.classList.remove("alert-warning");
        msgBox.classList.add("alert-danger");
    }
    msgBox.querySelector("p").innerHTML = msg;
    msgBox.classList.remove("d-none");
}

//login sivun toiminnallisuus

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)

if (urlParams.has("msg") && urlParams.has("type")) {
    const msg = urlParams.get("msg");
    const type = urlParams.get("type");

    showMessage(type, msg);
}