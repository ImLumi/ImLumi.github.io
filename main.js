function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name='amount-input']");
    let showAmount = document.querySelector("span.show-amount");
    let amountNumber = isNaN(parseInt(amountInput.value)) ? 0 : parseInt(amountInput.value);
    let amount = amountNumber * price;

    if (amountNumber > 10) {
        alert("Maximum 10 terméket vásárolhat!");
        return;
    } else if (amountNumber < 1) {
        alert("Minimum 1 terméket kell vásárolnia!")
        return;
    }

    showAmount.innerHTML = amount;
}

