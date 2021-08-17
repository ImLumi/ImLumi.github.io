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
let users = [
    { surname: "Berger", firstname: "Whitney", age: 22 },
    { surname: "Nagy", firstname: "Árpád", age: 37 },
    { surname: "Kiss", firstname: "Pista", age: 25 },
    { surname: "Jakab", firstname: "Emese", age: 52 },
    { surname: "Pöttyös", firstname: "Labda", age: 18 },
];
let tableBody = document.querySelector("#userTable tbody");
let createTD = (html,parent) => {
    let td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
}
let createButtonGroup = parent => {
    let group = document.createElement("div");
    group.className="btn-group";

    let btnPrimary = document.createElement("button");
    btnPrimary.className = "btn-primary btn";
    btnPrimary.innerHTML = '<i class="fas fa-sync"></i>';

    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.innerHTML = '<i class="far fa-trash-alt"></i>';

    group.appendChild(btnPrimary);
    group.appendChild(btnDanger);

    let td = document.createElement("td");
    td.className="btnTD";
    td.append(group);
    parent.appendChild(td);
    
}
for (const userIndex in users) {
    let tr = document.createElement("tr");
    createTD(parseInt(userIndex)+1,tr);
    tr.getat
    for (const value of Object.values(users[userIndex])) {
        createTD(value,tr);
    }
    createButtonGroup(tr);
    tableBody.appendChild(tr);

}

let clickButtons = document.querySelectorAll("button.btn-primary");
for (const Button of clickButtons) {
    Button.addEventListener("click",() => console.log(Button.parentElement.parentElement.parentElement));
    
}
console.log(clickButtons)

