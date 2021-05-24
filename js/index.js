// Index sivun js

window.addEventListener("load", getPolls);

document.getElementById("currentVotes").addEventListener("click", openPoll);
document.getElementById("oldVotes").addEventListener("click", openPoll);
document.getElementById("futureVotes").addEventListener("click", openPoll);

let data = null;

// Ota tietokannasta äänestykset

function getPolls() {
    console.log("haetaan dataa");
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        showPolls(data);
    }
    ajax.open("GET", "backend/getPolls.php?all_polls=true");
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

                createPollList(currentVotes, poll.id, poll.topic);
                
            }
        }

        //tulevat äänestykset
        if (type == "future") {
            if (start > now && start != false) {

                createPollList(futureVotes, poll.id, poll.topic);
                
            }
        }

        //Vanhat äänestykset
        if (type == "old") {
            if (end < now && end != false) {

                createPollList(oldVotes, poll.id, poll.topic);
                
            }
        }
    });
}

function createPollList(targetUl, pollId, pollTopic) {
    const newLi = document.createElement("li");
    newLi.classList.add("list-group-item");
    newLi.dataset.voteid = pollId;

    const liText = document.createTextNode(pollTopic);
    newLi.appendChild(liText);

    targetUl.appendChild(newLi);
}

function openPoll(e) {
    console.log(e.target.dataset.voteid);
    window.location.href = "vote.php?id=" + e.target.dataset.voteid;
}