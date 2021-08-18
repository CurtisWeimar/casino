let bankCash = sessionStorage.getItem('bankCash');
let cashOnHand = sessionStorage.getItem('cashOnHand');

bankCash = bankCash - 1000;

sessionStorage.setItem("bankCash", bankCash)

console.log(bankCash);
console.log(cashOnHand);
