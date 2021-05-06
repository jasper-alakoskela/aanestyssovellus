document.getElementById("addoption").addEventListener("click", newOption);

function newOption(e) {

    e.preventDefault();

    const div = document.createElement("div");
    div.classList.add("form-group");

    const label = document.createElement("label");
    const forAttribute = document.createAttribute("for");
    const labelText = document.createTextNode("Vaihtoehto");
    forAttribute.value = "option";
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    const input = document.createElement("input");

    input.classList.add("form-control");

    const inputType = document.createAttribute("type");
    inputType.value = "text";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute("name");
    inputName.value = "option";
    input.setAttributeNode(inputName);

    const inputPlaceHolder = document.createAttribute("placeholder");
    inputPlaceHolder.value = "Vaihtoehto";
    input.setAttributeNode(inputPlaceHolder);

    div.appendChild(label);
    div.appendChild(input);

    console.log(div);
}