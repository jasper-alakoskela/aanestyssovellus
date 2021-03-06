let optionCount = 2;

document.getElementById("addoption").addEventListener("click", newOption);
document.getElementById("delbtn").addEventListener("click", deleteOption);
document.forms["newpoll"].addEventListener("submit", createNewPoll);

function createNewPoll(e) {
    e.preventDefault();

    const topic = document.forms["newpoll"]["topic"].value;
    const start = document.forms["newpoll"]["start"].value;
    const end = document.forms["newpoll"]["end"].value;

    const inputTopic = document.forms["newpoll"]["topic"];
    const inputOption1 = document.getElementById("option1");
    const inputOption2 = document.getElementById("option2");


    const options = [];

    const inputs = document.querySelectorAll("input");

    inputs.forEach(function (input) {
        if (input.name.indexOf("option") == 0) {
            options.push(input.value);
        }
    })


    if (topic.length <= 0) {
        setErrorFor(inputTopic, 'Aihe tarvitaan!');
        return false;
    }

    else {
        setSuccessFor(inputTopic);
    }
    if (options[0].length <= 0) {
        setErrorFor(inputTopic, 'Ensimmäinen vaihtoehto tarvitaan!');
        return false;
    }

    else {
        setSuccessFor(inputOption1);
    }

    if (options[1].length <= 0) {
        setErrorFor(inputTopic, 'Toinen vaihtoehto tarvitaan!');
        return false;
    }

    else {
        setSuccessFor(inputOption2);
    }

    let postData = `topic=${topic}&start=${start}&end=${end}`;
    let i = 0;
    options.forEach(function (option) {
        postData += `&option${i++}=${option}`
    })
    console.log(postData);

    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty("success")) {
            window.location.href = "index.php?type=success&msg=Luonti onnistui";
            return;
        }
        else {
            showMessage("error", data.error);
        }
    }
    ajax.open("POST", "backend/createNewPoll.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(postData);
}



function deleteOption(e) {

    e.preventDefault();

    if (optionCount <= 2) {
        return;
    }

    const optionToDelete = document.querySelector("fieldset").lastElementChild;
    const parentElement = document.querySelector("fieldset");
    parentElement.removeChild(optionToDelete);

    optionCount--;
}

function newOption(e) {

    e.preventDefault();

    optionCount++;

    // uusi div

    const div = document.createElement("div");
    div.classList.add("form-group");

    // uusi label

    const label = document.createElement("label");
    const forAttribute = document.createAttribute("for");
    const labelText = document.createTextNode(`Vaihtoehto${optionCount}`);
    forAttribute.value = `option${optionCount}`;
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    // uusi input

    const input = document.createElement("input");

    input.classList.add("form-control");

    const inputType = document.createAttribute("type");
    inputType.value = "text";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute("name");
    inputName.value = `option${optionCount}`;
    input.setAttributeNode(inputName);

    const inputPlaceHolder = document.createAttribute("placeholder");
    inputPlaceHolder.value = `Vaihtoehto${optionCount}`;
    input.setAttributeNode(inputPlaceHolder);

    div.appendChild(label);
    div.appendChild(input);

    document.querySelector("fieldset").appendChild(div);

}