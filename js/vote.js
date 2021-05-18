const pollQueryString = window.location.search;
console.log(pollQueryString);

const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has("id")) {
    getPollData(pollParams.get("id"));
}

//document.getElementById("optionsUl").addEventListener("click", giveVote);

function getPollData(id) {
    console.log(id);
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {

        data = JSON.parse(this.responseText);
        console.log(data);
    }
    ajax.open("GET", "backend/getPoll.php?id=" + id);
    ajax.send();
}

/*
function showPoll(data) {
    document.querySelector("h2").innerHTML = data[0].topic;
    const ul = document.getElementById("optionsUl");

    data["options"].forEach(option => {
        const newLi = document.createElement("li");
        newLi.classname = "list-group-item d-flex justify-content-between align-items-center";
        newLi.dataset.optionid = option.id;

        const newButton = document.createElement("button");
        newButton.classname = "btn btn-outline-info btn-lg btn-primary btn-block";
        newButton.dataset.optionid = option.id;

        const buttonText = document.createTextNode(option.name);
        newButton.appendChild(buttonText);
        newLi.appendChild(newButton);
        ul.appendChild(newLi);
    });
}

function giveVote(e) {
    console.log("e.target.dataset.optionid");
    let id = e.target.dataset.optionid;
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
    }
    ajax.open("GET", "backend/giveVote.php?id=" + id);
    ajax.send();
}*/
