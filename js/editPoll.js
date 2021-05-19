// muokkaa äänestystä JavaScript

// hae id
const pollQueryString = window.location.search;
const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has("id")) {
    getPollData(pollParams.get("id"));
}

// Äänestys data tietokannasta

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