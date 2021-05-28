// admin sivun js

window.addEventListener("load", getUserPolls);

document.getElementById("currentVotes").addEventListener("click", openPoll);
document.getElementById("oldVotes").addEventListener("click", openPoll);
document.getElementById("futureVotes").addEventListener("click", openPoll);

let data = null;

// Ota tietokannasta äänestykset

function getUserPolls() {
    console.log("haetaan dataa")
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        showPolls(data);
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

    // Poistonappi
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.dataset.action = "delete";
    const deleteBtnText = document.createTextNode("Poista");
    newDeleteBtn.classList.add("btn");
    newDeleteBtn.classList.add("btn-outline-danger");
    newDeleteBtn.classList.add("btn-sm");
    newDeleteBtn.appendChild(deleteBtnText);

    // Editointinappi
    const newEditBtn = document.createElement("button");
    newEditBtn.dataset.action = "edit";
    const editBtnText = document.createTextNode("Muokkaa");
    newEditBtn.classList.add("btn");
    newEditBtn.classList.add("btn-outline-info");
    newEditBtn.classList.add("btn-sm");
    newEditBtn.appendChild(editBtnText);

    const liText = document.createTextNode(pollTopic);
    newLi.appendChild(liText);

    newLi.appendChild(newDeleteBtn);
    newLi.appendChild(newEditBtn);

    targetUl.appendChild(newLi);

}

function openPoll(e) {
    console.log(e.target.dataset.voteid);
    const action = e.target.dataset.action;


    if (action == "delete") {
        let pollId = e.target.parentElement.dataset.voteid;
        deletePoll(pollId)
        return;
    }

    if (action == "edit") {
        let pollId = e.target.parentElement.dataset.voteid;
        editPoll(pollId)
        return;
    }

    window.location.href = "results.php?id=" + e.target.dataset.voteid;
}

function deletePoll(id) {
    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        data = JSON.parse(this.responseText);
        console.log(data);
        let deleteTarget = document.querySelector(`[data-voteid="${id}"]`);
        let parent = deleteTarget.parentElement;
        parent.removeChild(deleteTarget);
        if (data.hasOwnProperty("success")) {
            window.location.href = "admin.php?type=success&msg=Poisto onnistui!";
            return;
        } else {
            showMessage("error", "Poisto epäonnistui");
        }
    }
    ajax.open("GET", "backend/deletePoll.php?id=" + id);
    ajax.send();
}

function editPoll(id) {
    window.location.href = "editPoll.php?id=" + id;
}