
document.forms["login"].addEventListener("submit", login);

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
        setErrorFor(pwdInput, 'Salasana liian lyhyt!');
        return false;
    }

    else {
        setSuccessFor(pwdInput);
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(this.responseText);
        console.log(data);
        if (data.hasOwnProperty("success")) {
            window.location.href = "index.php?type=success&msg=Kirjautuminen onnistui";
            return;
        } else {
            showMessage("error", "Kirjautuminen epäonnistui");
            setErrorFor(nameInput);
            setErrorFor(pwdInput);
        }
    }

    ajax.open("POST", "backend/login-user.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`username=${username}&password=${password}`);

}

