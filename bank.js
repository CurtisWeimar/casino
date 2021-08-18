let bankCash = Number(sessionStorage.getItem('bankCash'));
let cashOnHand = Number(sessionStorage.getItem('cashOnHand'));
let casinoChipTxt = document.getElementById('casinoChipsBank');
let moneyInBankTxt = document.getElementById('moneyInBank');
let bankDeposit = document.getElementById('depositAmount');
let bankWithdraw = document.getElementById('withdrawAmount');

let depositMax = cashOnHand;
casinoChipTxt.innerHTML = `CASINO CHIPS: $${cashOnHand}`;


bankDeposit.setAttribute("max", depositMax);

if(bankCash < 0)
{
    let tempBank = Math.abs(bankCash);
    let str = " -$" + tempBank.toString();
    moneyInBankTxt.innerHTML = "BANK ACCOUNT: " + str.fontcolor("red");
}
else{    
    let str = bankCash.toString();
    moneyInBankTxt.innerHTML = "BANK ACCOUNT: $" + str.fontcolor("white");
}

bankDeposit.value = 0;
bankWithdraw.value = 0;

function depositFunc(){

    if(bankDeposit.value <= cashOnHand)
    {

    
        cashOnHand -= Number(bankDeposit.value);
        bankCash += Number(bankDeposit.value);

        casinoChipTxt.innerHTML = `CASINO CHIPS: $${cashOnHand}`;

        if(bankCash < 0)
        {
            let tempBank = Math.abs(bankCash);
            let str = " -$" + tempBank.toString();
            moneyInBankTxt.innerHTML = "BANK ACCOUNT: " + str.fontcolor("red");
        }
        else{    
            let str = bankCash.toString();
            moneyInBankTxt.innerHTML = "BANK ACCOUNT: $" + str.fontcolor("white");
        }

        sessionStorage.setItem('bankCash', bankCash);
        sessionStorage.setItem('cashOnHand', cashOnHand);

        depositMax = cashOnHand;
        bankDeposit.setAttribute("max", depositMax);
        bankDeposit.value = 0;
        bankWithdraw.value = 0;
    }
    else{
        alert("You are trying to deposit more money than you own! Please try a smaller amount");
    }

}

function withdrawFunc(){
    cashOnHand += Number(bankWithdraw.value);
    bankCash -= Number(bankWithdraw.value);

    casinoChipTxt.innerHTML = `CASINO CHIPS: $${cashOnHand}`;

    if(bankCash < 0)
    {
        let tempBank = Math.abs(bankCash);
        let str = " -$" + tempBank.toString();
        moneyInBankTxt.innerHTML = "BANK ACCOUNT: " + str.fontcolor("red");
    }
    else{    
        let str = bankCash.toString();
        moneyInBankTxt.innerHTML = "BANK ACCOUNT: $" + str.fontcolor("white");
    }

    depositMax = cashOnHand;
    bankDeposit.setAttribute("max", depositMax);
    sessionStorage.setItem('bankCash', bankCash);
    sessionStorage.setItem('cashOnHand', cashOnHand);

    bankDeposit.value = 0;
    bankWithdraw.value = 0;
}





console.log(bankCash);
console.log(cashOnHand);