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
        if (data.hasOwnProperty("succes")) {
            window.open("login.php");
        }
        else {
            alert(data.error);
        }
    }
    ajax.open("POST", "backend/registerNewUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("username=" + username + "&password=" + password);
}
