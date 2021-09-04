
getJsonServer();
let activeModifyRow = false;

function getJsonServer() {
    let fetchOptions = {

        async: true,
        crossDomain: true,

        method: "GET",
        headers: {
            "content-type": "application/json",
            'X-API-KEY': "6123c5a569fac573b50a57be",
            "cache-control": "no-cache"
        }
    }
    fetch(`https://testdb-ef68.restdb.io/rest/db`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            updateTable(data);
        }
    );
}
function postJsonServer(jsondata) {
    let fetchOptions = {
        "async": true,
        "crossDomain": true,
        "url": `https://testdb-ef68.restdb.io/rest/db/`,
        mode: 'cors',
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            'X-API-KEY': "6123c5a569fac573b50a57be",
            "cache-control": "no-cache"
        },
        "processData": false,
        body: JSON.stringify(jsondata),
    }
    fetch(`https://testdb-ef68.restdb.io/rest/db`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => console.log(data)
    );
}

function putJsonServer(jsondata, id) {
    let fetchOptions = {
        "async": true,
        "crossDomain": true,
        "url": `https://testdb-ef68.restdb.io/rest/db/${id}`,
        mode: 'cors',
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            'X-API-KEY': "6123c5a569fac573b50a57be",
            "cache-control": "no-cache"
        },
        "processData": false,
        body: JSON.stringify(jsondata),
    }
    fetch(`https://testdb-ef68.restdb.io/rest/db/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            console.log(data);
        }
    );
}
function deleteJsonServer(id) {
    let fetchOptions = {
        "async": true,
        "crossDomain": true,
        "url": `https://testdb-ef68.restdb.io/rest/db/${id}`,
        mode: 'cors',
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            'X-API-KEY': "6123c5a569fac573b50a57be",
            "cache-control": "no-cache"
        },
    }
    fetch(`https://testdb-ef68.restdb.io/rest/db/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            console.log(data);
        }
    );
}

let keys = ["_id", "lastname", "firstname", "age"];

let tableBody = document.querySelector("#userTable tbody");

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (const k in attributes) {
        element.setAttribute(k, attributes[k])
    }
    return element;
}
let createTD = (html, parent) => {
    let td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
}
let createButtonGroup = parent => {
    let group = createAnyElement("div",{class:"btn-group"});
    /*
    let group = document.createElement("div");
    group.className = "btn-group";
    */
    let btnPrimary = document.createElement("button");
    btnPrimary.className = "btn-primary btn";
    btnPrimary.innerHTML = '<i class="fas fa-sync"></i>';

    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.innerHTML = '<i class="far fa-trash-alt"></i>';

    group.appendChild(btnPrimary);
    group.appendChild(btnDanger);

    let td = createAnyElement("td");
    td.className = "btnTD";
    td.append(group);
    parent.appendChild(td);
    

}

function updateTable(data) {
    tableBody.innerHTML = '';
    for (let user of data) {
        let tr = document.createElement("tr");
        for (key of keys) {
            let td = createAnyElement("td", { name: key });
            td.innerHTML = user[key];
            tr.appendChild(td)
        }
        createButtonGroup(tr);
        tableBody.appendChild(tr);
        addButtonEvent();
    }
    let tr = createAnyElement("tr");
    createInputRow(tr);
    tableBody.appendChild(tr);
}



function createObjectByRow(row) {
    return Object.assign(...keys.map((key, index) => (
        { [key]: Array.from(row.querySelectorAll(`td:not(.btnTD)`), item => item.innerHTML)[index] }
    )));
}

function removeInputRow(row) {
    let inputs = row.querySelectorAll("input");
    for (input of inputs) {
        input.parentElement.innerHTML = input.value;
        input.remove();
    }
    row.lastChild.remove();
    let td = createAnyElement("td");
    createButtonGroup(row);
}
function createInputRow(row, values) {
    row.innerHTML = "";
    for (const key of keys) {
        if (key == "_id") {
            let td = createAnyElement("td", { name: key });
            td.innerHTML = values ? values[key] : "#";
            row.appendChild(td);
            continue;
        }
        let td = createAnyElement("td");
        let input = createAnyElement("input", { name: key });
        input.value = values ? values[key] : "";
        td.appendChild(input);
        row.appendChild(td);
    }

    let tdBtn = values ? createModifyButton() : createAddButton();
    row.appendChild(tdBtn);

}
function createAddButton() {
    let td = createAnyElement("td", { name: "addButton" });
    let btn = createAnyElement("button", { class: "btn btn-success" })
    btn.innerHTML = '<i class="fas fa-plus-circle"></i>';
    
    btn.addEventListener("click", addUser);
    td.appendChild(btn);
    return td;
}
function createModifyButton() {
    let td = createAnyElement("td", { name: "modifyButton" });
    let btn = createAnyElement("button", { class: "btn btn-success" })
    btn.innerHTML = '<i class="fas fa-plus-circle"></i>';
    btn.style.width = "82px";
    btn.addEventListener("click", modifyUser);
    td.appendChild(btn);
    return td;
}
function addUser() {
    let inputs = this.parentElement.parentElement.querySelectorAll("input");
    let user = {};
    for (input of inputs) {
        user[input.name] = input.value;
    }
    console.log(JSON.stringify(user));
    postJsonServer(user);
    getJsonServer();
}

function modifyUser() {
    let id = this.parentElement.parentElement.querySelector("td[name='_id']").innerHTML;
    let inputs = this.parentElement.parentElement.querySelectorAll("input");
    let user = {};
    for (input of inputs) {
        user[input.name] = input.value;
    }
    console.log(JSON.stringify(user));
    putJsonServer(user, id);
    removeInputRow(this.parentElement.parentElement);
}
function closeInputRow() {
    let buttons = document.querySelectorAll("td[name='modifyButton']");
    for (button of buttons) {
        removeInputRow(button.parentElement);
        createButtonGroup(button);
        addButtonEvent();
        button.remove();
    }

}
function modifyButtonHandler() {
    closeInputRow();
    let row = this.parentElement.parentElement.parentElement;
    createInputRow(row, createObjectByRow(row));
}
function deleteButtonHandler() {
    let row = this.parentElement.parentElement.parentElement;
    let id = row.querySelector("td[name='_id']").innerHTML;
    if (confirm("Biztos törölni szeretné?")) {
        deleteJsonServer(id);
        row.remove();
    }
}
function addButtonEvent() {
    let modifyButtons = document.querySelectorAll("button.btn-primary");
    for (const button of modifyButtons) {
        button.addEventListener("click", modifyButtonHandler);
    }
    let deleteButtons = document.querySelectorAll("button.btn-danger");
    for (const button of deleteButtons) {
        button.addEventListener("click", deleteButtonHandler);
    }
}


