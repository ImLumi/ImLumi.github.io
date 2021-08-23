/* <tr>
    <td>1</td>
    <td>Kiss</td>
    <td>János</td>
    <td>55</td>
    <td>
        <div class="btn-group">
            <button class="btn-primary btn">
                sync
            </button>
            <button class="btn btn-danger">
                del
            </button>
        </div>
    </td>
</tr> */

/*let users = [
    { id: 1, lastname: "Berger", firstname: "Whitney", age: 22 },
    { id: 2, lastname: "Nagy", firstname: "Árpád", age: 37 },
    { id: 3, lastname: "Kiss", firstname: "Pista", age: 25 },
    { id: 4, lastname: "Jakab", firstname: "Emese", age: 52 },
    { id: 5, lastname: "Pöttyös", firstname: "Labda", age: 18 },
];
*/
let users = [];
getJsonServer();

function getJsonServer() {
    let fetchOptions = {

        async: true,
        crossDomain: true,

        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-apikey": "6123c5a569fac573b50a57be",
            "cache-control": "no-cache"
        }
    }
    fetch(`https://testdb-ef68.restdb.io/rest/db`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            updateTable(data);
            users.push(...data);
        }
    );
}
function postJsonServer(jsondata) {
    let fetchOptions = {

        "async": true,
        "crossDomain": true,
        "url": "https://testdb-ef68.restdb.io/rest/db",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "<6123c5a569fac573b50a57be>",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
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
    let group = document.createElement("div");
    group.className = "btn-group";

    let btnPrimary = document.createElement("button");
    btnPrimary.className = "btn-primary btn";
    btnPrimary.innerHTML = '<i class="fas fa-sync"></i>';

    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.innerHTML = '<i class="far fa-trash-alt"></i>';

    group.appendChild(btnPrimary);
    group.appendChild(btnDanger);

    let td = document.createElement("td");
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
}



function createInputRow() {
    let row = this.parentElement.parentElement.parentElement;
    let id = row.querySelector(`td[name="_id"]`);
    row.innerHTML = "";
    row.appendChild(id);
    for (const key of keys) {
        if (key == "_id") {
            continue;
        }
        let td = createAnyElement("td");
        let input = createAnyElement("input", { name: key });
        let user = users.find(element => element["_id"] == id.innerHTML)
        input.value = user[key];
        td.appendChild(input);
        row.appendChild(td);
    }
    let td = createAnyElement("td", { class: "addButton" });
    let btn = createAnyElement("button", { class: "btn btn-success" })
    btn.innerHTML = '<i class="fas fa-plus-circle"></i>';
    btn.style.width = "82px";
    btn.addEventListener("click", modifyUser)
    td.appendChild(btn);
    row.appendChild(td);

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
}
function addButtonEvent() {
    let clickButtons = document.querySelectorAll("button.btn-primary");
    for (const button of clickButtons) {
        button.addEventListener("click", createInputRow);
    }
}


