//const Expense = require('../models/expenses');
let myForm = document.getElementById('my-form');
let amount = document.getElementById('Amount');
let description = document.getElementById('Description');

let category = document.getElementById('Category');

myForm.addEventListener('submit', onClick)

function onClick(e) {
    e.preventDefault();

    let myobj = {
        Amt: amount.value,
        Des: description.value,
        Ctg: category.value,
    }

    let myObj = JSON.stringify(myobj);
    localStorage.setItem(myobj.Amt, myObj);

    ShowOnDisplay(myobj);


}

function ShowOnDisplay(user) {

    if (localStorage.getItem(user.Amt) !== null) {
        removeExpenseFromScreen(user.Amt)
    }
    let parentNode = document.getElementById('Expenselist')
    let childHTML = `<li id=${user.Amt}>${user.Amt} - ${user.Des} - ${user.Ctg}
    <button onclick=deleteExpense('${user.Amt}')> Delete Expense</button>
    <button onclick=editExpense('${user.Amt},${user.Des}')>Edit Expense </button>
    
    </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys = Object.keys(localStorageObj)

    for (let i = 0; i < localstoragekeys.length; i++) {
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        ShowOnDisplay(userDetailsObj)
    }
})


function editExpense(Amt, des) {
    //const amounts=amt.map(amount =>amt.amount);

    //const descriptions=amounts.


    document.getElementById('Amount').value = Amt;
    document.getElementById('Description').value = des;

localStorage.editExpense(des);
    editExpense(amt,des);
}


function deleteExpense(Amt) {
    console.log(Amt)
    localStorage.removeItem(Amt);
    removeExpenseFromScreen(Amt);

}

function removeExpenseFromScreen(Amt) {
    let parentNode = document.getElementById('Expenselist');
    let childNodeToBeDeleted = document.getElementById(Amt);


    if (childNodeToBeDeleted) {

        parentNode.removeChild(childNodeToBeDeleted);
    }

}