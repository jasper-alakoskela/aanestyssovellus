const pollQueryString = window.location.search;
console.log(pollQueryString);

const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has("id")) {
    getPollData(pollParams.get("id"));
}

document.getElementById("optionsUl").addEventListener("click", giveVote);

function getPollData(id) {
    console.log(id);
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
        showPoll(data);
    }
    ajax.open("GET", "backend/getPoll.php?id=" + id);
    ajax.send();
}


function showPoll(data) {
    document.querySelector("h2").innerHTML = data.topic;
    const ul = document.getElementById("optionsUl");

    data["options"].forEach(option => {
        const newLi = document.createElement("li");
        newLi.classList.add("list-group-item");
        newLi.classList.add("d-flex");
        newLi.classList.add("justify-content-between");
        newLi.classList.add("align-items-center");
        newLi.dataset.optionid = option.id;

        const newButton = document.createElement("button");
        newButton.classList.add("btn");
        newButton.classList.add("btn-outline-info");
        newButton.classList.add("btn-lg");
        newButton.classList.add("btn-primary");
        newButton.classList.add("btn-block");
        newButton.dataset.optionid = option.id;

        const buttonText = document.createTextNode(option.name);
        newButton.appendChild(buttonText);
        newLi.appendChild(newButton);
        ul.appendChild(newLi);
    });
}

function giveVote(e) {
    console.log(e.target.dataset.optionid);
    let id = e.target.dataset.optionid;
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
        if (data.hasOwnProperty("success")) {
            window.location.href = "index.php?type=success&msg=Kiitos äänestyksestä";
            return;
        }
        else if (data.hasOwnProperty("warning")) {
            showMessage("warning", data.warning)
        }
        else {
            showMessage("error", "äänestys epäonnistui");
        }
    }
    ajax.open("GET", "backend/giveVote.php?id=" + id);
    ajax.send();
}
