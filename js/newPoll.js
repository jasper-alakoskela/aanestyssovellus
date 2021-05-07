let optionCount = 2;

document.getElementById("addoption").addEventListener("click", newOption);
document.getElementById("delbtn").addEventListener("click", deleteOption);

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