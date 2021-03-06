// Index sivun js

window.addEventListener("load", getPolls);

document.getElementById("currentVotes").addEventListener("click", openPoll);
document.getElementById("oldVotes").addEventListener("click", openResults);
document.getElementById("futureVotes").addEventListener("click", openResults);

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
// Funktio joka luo listan

function createPollList(targetUl, pollId, pollTopic) {
    const newLi = document.createElement("li");
    newLi.classList.add("list-group-item");
    newLi.dataset.voteid = pollId;

    //äänestysnappi
    const newVoteBtn = document.createElement("button");
    newVoteBtn.dataset.action = "vote";
    const voteBtnText = document.createTextNode("Äänestä");
    newVoteBtn.classList.add("btn");
    newVoteBtn.classList.add("btn-outline-info");
    newVoteBtn.classList.add("btn-sm");
    newVoteBtn.appendChild(voteBtnText);

    const liText = document.createTextNode(pollTopic);
    newLi.appendChild(liText);

    newLi.appendChild(newVoteBtn);

    targetUl.appendChild(newLi);
}

function openPoll(e) {
    console.log(e.target.dataset.voteid);
    const action = e.target.dataset.action;

    if (action == "vote") {
        console.log(e.target.parentElement.dataset.voteid);
        window.location.href = "vote.php?id=" + e.target.parentElement.dataset.voteid;
        //let pollId = e.target.parentElement.dataset.voteid;
        //editPoll(pollId)
        return;
    }

    window.location.href = "results.php?id=" + e.target.dataset.voteid;
}

function openResults(e) {
    console.log(e.target.dataset.voteid);
    window.location.href = "results.php?id=" + e.target.dataset.voteid;
}
