// admin sivun js

window.addEventListener("load", getUserPolls);

let data = null;

document.getElementById("currentVotes").addEventListener("click", openPoll);
document.getElementById("oldVotes").addEventListener("click", openPoll);
document.getElementById("futureVotes").addEventListener("click", openPoll);

function getUserPolls() {
    console.log("haetaan dataa")
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        showPolls();
    }
    ajax.open("GET", "backend/getPolls.php");
    ajax.send();
}

function showPolls(data, type) {

    console.log(data);

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
            start = new Date(poll.start);
        }
        if (poll.end != "0000-00-00 00:00:00") {
            end = new Date(poll.end);
        }


        //Nykyiset äänestykset
        // Oikea alkamis ja loppumis aika.
        if (type == "current") {
            if ((start == false || start <= now) && (end == false || end >= now)) {

                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item");
                newLi.dataset.voteid = poll.id;

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
                newLi.dataset.voteid = poll.id;

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                oldVotes.appendChild(newLi);
            }
        }

        //tulevat äänestykset
        if (type == "future") {
            if (start > now && start != false) {

                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item");
                newLi.dataset.voteid = poll.id;

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                futureVotes.appendChild(newLi);
            }
        }

    });
}

function openPoll(e) {
    console.log(e.target.dataset.voteid);
    window.location.href = "vote.php?id=" + e.target.dataset.voteid;
}