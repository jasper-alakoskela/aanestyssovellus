// Index sivun js

let data = null;

// Ota tietokannasta äänestykset

function getPolls() {
    console.log("haetaan dataa")
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(this.responseText);
        showPolls();
    }
    ajax.open("GET", "backend/getPolls.php");
    ajax.send
}

function showPolls(type = "current") {

    const currentVotes = document.getElementById("currentVotes");
    currentVotes.innerHTML = "";

    const futureVotes = document.getElementById("futureVotes");
    futureVotes.innerHTML = "";

    const oldVotes = document.getElementById("oldVotes");
    oldVotes.innerHTML = "";

    const now = new Date();

    data.forEach(poll => {

        let start = false;
        let end = false;

        if (poll.start != "0000-00-00 00:00:00") {
            let start = new Date(poll.start);
        }
        if (poll.end != "0000-00-00 00:00:00") {
            let end = new Date(poll.end);
        }
        //Nykyiset äänestykset
        // Oikea alkamis ja loppumis aika.
        if (type == "current") {
            if ((start == false || start >= now) && (end == false || end >= now)) {

                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item");

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                currentVotes.appendChild(newLi);
            }
        }

        //Vanhat äänestykset
        if (type == "old") {
            if (end < now && end != false) {

                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item");

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                futureVotes.appendChild(newLi);
            }
        }

        //tulevat äänestykset
        if (type == "future") {
            if (start < now && start != false) {

                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item");

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                oldVotes.appendChild(newLi);
            }
        }

    });
}