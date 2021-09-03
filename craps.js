const card1 = document.getElementById("dice1");
const card2 = document.getElementById("dice2");

var roll1 = 1;
var roll2 = 1;

function diceClick(evt){
    roll1 = getRand(6) + 1;
    roll2 = getRand(6) + 1;
    console.log(`Rolls: ${roll1} and ${roll2}`);

    card1.style.backgroundImage=`url(Assets/Craps/Dice${roll1}.png)`;
    card2.style.backgroundImage=`url(Assets/Craps/Dice${roll2}.png)`;

    checkWin();
}

function checkWin() {
    //If bot rolls equals seven
    if(roll1 + roll2 == 7) {
        alert("You win!");
    }
}

function getRand(max) {
    return Math.floor(Math.random() * max);
}