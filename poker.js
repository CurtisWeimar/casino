const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const bets = document.getElementById("bets");
const bank = document.getElementById("bank");

const winnings = document.getElementById("winnings");
const dealBtn = document.getElementById("drawBtn");

let currentBalance = Number(sessionStorage.getItem('cashOnHand'));

bank.innerHTML = `$${currentBalance}`;

class Card {
    held = false;
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

//The base deck
let deck = new Array();
//All cards currently drawn
let drawnCards = new Array(5);
//All card that have been discarded
let usedCards = new Array();

//Betting
var currentBet = 0;
var currentPot = 0;
var ante = 1;

//Draws tracking
var draws = 0;
var heldCards = 0;

//Add a card to the array for ever suit and rank
for(var i = 0; i < 4; i++) {
    for(var x = 1; x < 14; x++) {
        let pushing = new Card();
        pushing.rank = getRank(x);
        pushing.suit = getSuit(i);
        deck.push(pushing);
    }
}

//Add the two jokers
// deck.push(14, "Joker");
// deck.push(14, "Joker");

shuffle(deck);

function resetDeck() {
    usedCards.forEach(card => deck.push(card))
    shuffle(deck);
}

function shuffle(array) {
    var randomIndex;
    for(var i = 0; i < array.length; i++) {
        randomIndex = getRand(array.length);

        //Swap current card with a random card
        var tempCard = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = tempCard;
    }
}

function chipSelect(evt) {
    //TODO: Betting oh boy

    if(draws != 0) {
        switch(evt.id.slice(-1)) {
            case "1":
                bet(1);
                break;
            case "2":
                bet(5);
                break;
            case "3":
                bet(10);
                break;
            case "4":
                bet(20);
                break;
            case "5":
                bet(50);
                break;
            case "6":
                bet(100);
                break;
            case "7":
                bet(1000);
                break;
            case "8":
                bet(5000);
                break;
        }
    }
}

var reset = false;

function bet(amount) {
    if(amount <= currentBalance) {
        currentBet += amount;
        currentBalance -= amount;
        sessionStorage.setItem('cashOnHand', currentBalance);
        bank.innerHTML = `$${currentBalance}`;
        bets.innerHTML = `$${currentBet}`;
    } else if(amount > currentBalance) {
        alert("Not enough money!");
    }
}

//Deal new cards click
function dealClick() {
    //If no cards have been drawn yet
    if(draws == 0) {
        //Ye olde ante
        if(currentBet == 0) {
            bet(5);
        }
        for(var i = 0; i < 5; i++) {
            randomCard(i);
        }
        draws += 1;
    }

    //After you have drawn 5
    if(heldCards >= 2 && draws == 1) {
        for(var x = 0; x < 5; x++) {
            if(!drawnCards[x].held) {
                randomCard(x);
            }
        }

        var winAmount = calculatePayout();
        currentBalance += winAmount;
        winnings.innerHTML = parseInt(winnings.innerHTML) + winAmount;
        sessionStorage.setItem('cashOnHand', currentBalance);
        bank.innerHTML = `$${currentBalance}`;

        dealBtn.innerHTML = "RESET";
        draws += 1;
    }

    //If you have already discarded
    if(reset) {
        card1.style.backgroundImage="none";
        card2.style.backgroundImage="none";
        card3.style.backgroundImage="none";
        card4.style.backgroundImage="none";
        card5.style.backgroundImage="none";

        resetGame();
    }

    if(draws >= 2) {
        reset = true;
        drawnCards.forEach(card => card.held = false);
    }
}

//So much and it works :)
function calculatePayout() {
    var payout = 0;

    /*
    Shove everything from "drawnCards" into a new array
    so I can just work with the ranks and dont have to call
    "getRankNum(drawnCards[index].rank)" for everything
    */ 
    let hand = new Array();
    for(var i = 0; i < 5; i++) {
        hand.push(getRankNum(drawnCards[i].rank));
    }

    //Sort the current hand based off rank
    for(var i = 0; i < 5; i++) {
        for(var x = 0; x < (5 - i - 1); x++) {
            if(hand[x] > hand[x + 1]) {
                var temp = hand[x];
                hand[x] = hand[x + 1];
                hand[x + 1] = temp;
            }
        }
    }

    //Also sort fucking drawnCards for one check. Cringe.
    for(var i = 0; i < 5; i++) {
        for(var x = 0; x < (5 - i - 1); x++) {
            if(getRankNum(drawnCards[x].rank) > getRankNum(drawnCards[x + 1].rank)) {
                var temp = drawnCards[x];
                drawnCards[x] = drawnCards[x + 1];
                drawnCards[x + 1] = temp;
            }
        }
    }

    // console.log(hand);
    // console.log(drawnCards);

    var testHand = new Array();
    testHand.push(1);
    testHand.push(1);
    testHand.push(3);
    testHand.push(4);
    testHand.push(5);

    //Straight flush
    if(checkStraightFlush(hand, drawnCards)) {
        return currentBet * 10000;
    }

    //Four of a kind check
    //currentBet * 1000
    if(checkFour(hand)) {
        return currentBet * 1000;
    }

    //Full House check
    //currentBet * 100;
    if(checkFullHouse(hand)) {
        return currentBet * 100;
    }

    //Flush check
    //currentBet * 50;
    if(checkFlush(drawnCards)) {
        return currentBet * 50;
    }

    //Straight check
    //currentBet * 25;
    if(checkStraight(hand)) {
        return currentBet * 25;
    }

    //Three-of-a-Kind check
    //currentBet * 10;
    if(checkThree(hand)) {
        return currentBet * 10;
    }

    //Two Pair check
    //currentBet * 5;
    if(checkTwoPair(hand)) {
        return currentBet * 5;
    }

    //Pair check
    //currentBet;
    console.log(checkPair(testHand));
    if(checkPair(hand)) {
        return currentBet * 1;
    }

    return 0;
}

///////////////////////////////////////////
///////////////////////////////////////////
//            BET CHECKS OH BOY          //
///////////////////////////////////////////
///////////////////////////////////////////

//Straight flush
function checkStraightFlush(hand, drawnCards) {
    var count = 0;
    //Ace shenanigans
    if(hand[0] == 1) {
        if(14 - hand[4] == 1 && drawnCards[0].suit == drawnCards[4].suit) {
            count++;
        }
    }

    //Actual check
    for(var i = 0; i < 4; i++) {
        // console.log(`First hand check: ${hand[i + 1] - hand[i] == 1}`);
        // console.log(`Hand + 1 ${hand[i + 1]}, Hand ${hand[i]}`);
        // console.log(`Suit check: ${drawnCards[i + 1].suit == drawnCards[i].suit}`);
        if(hand[i + 1] - hand[i] == 1 && drawnCards[i + 1].suit == drawnCards[i].suit) {
            count++;
        }
    }

    // console.log(count);
    if(count >= 4) {
        return true;
    } else {
        return false;
    }
}

//Four of a kind
function checkFour(hand) {
    count = 0;
    for(var i = 0; i < 4; i++) {
        // console.log(`Card 1: ${hand[i]}, Card 2: ${hand[i + 1]}`);
        if(hand[i] == hand[i + 1]) {
            count++;
        }
    }

    // console.log(count);
    if(count == 3) {
        return true;
    } else {
        return false;
    }
}

//Full House
function checkFullHouse(hand) {
    count = 0;
    //Check the first three cards
    for(var i = 0; i < 2; i++) {
        if(hand[i] == hand[i + 1]) {
            count++;
        }
    }

    //Check if first three and last two make full house
    if(count == 2 && hand[3] == hand[4]) {
        return true;
    }

    //Check off the last three cards
    count = 0;
    for(var i = 4; i > 2; i--) {
        if(hand[i] == hand[i - 1]) {
            count++;
        }
    }
    
    //Check if the last three and first two make full house
    // console.log(count);
    // console.log(`First two check: ${hand[0] == hand[1]}`);
    if(count ==2 && hand[0] == hand[1]) {
        return true;
    } else return false;
}

//Flush
function checkFlush(drawnCards) {
    count = 0;
    for(var i = 0; i < 4; i++) {
        if(drawnCards[i].suit == drawnCards[i + 1].suit) {
            count++;
        }
    }

    if(count == 4) {
        return true;
    } else return false;
}

//Straight
function checkStraight(hand) {
    count = 0;
    //Ace shenanigans
    if(hand[0] == 1) {
        if(14 - hand[4] == 1) {
            count++;
        }
    }

    //Actual check
    for(var i = 0; i < 4; i++) {
        if(hand[i + 1] - hand[i] == 1) {
            count++;
        }
    }

    if(count == 4) {
        return true;
    } else return false;
}

//Three of a kind
function checkThree(hand) {
    count = 0;
    //Check first three
    for(var i = 0; i < 2; i++) {
        if(hand[i] == hand[i + 1]) {
            count++
        }
    }

    if(count == 2) {
        return true;
    }

    //Check last three
    count = 0;
    for(var i = 2; i < 4; i++) {
        if(hand[i] == hand[i + 1]) {
            count++;
        }
    }

    if(count == 2) {
        return true
    } else return false;
}

//Check two pair
    //Fuck it nested loop time
function checkTwoPair(hand) {
    var pairsCount = 0;
    var checkedNum = 0;
    var currentNum = 0;
    for(var i = 0; i < 4; i++) {
        count = 0;
        // console.log(`Checked before: ${hand[i]} = ${hand[i] == checkedNum}`);
        if(hand[i] != checkedNum) {
            currentNum = hand[i];
            // console.log(`New check: ${currentNum}`);
            for(var x = 0; x < 5; x++) {
                if(hand[x] == currentNum) {
                    count++;
                    checkedNum = currentNum;
                }
            }
            if(count == 2) {
                pairsCount++;
            }
        }
    }

    // console.log(pairsCount);
    if(pairsCount == 2) {
        return true;
    } else return false;
}

//Pair
function checkPair(hand) {
    for(var i = 0; i < 4; i++) {
        for(var x = 0; x < 5; x++) {
            // console.log(`Checking ${hand[i]} and ${hand[x]}`);
            if(hand[i] == hand[x] && x != i) {
                return true;
            }
        }
    }
    return false;
}

//////////////////////////////////////
//           CARD FUNCTIONS         //
//////////////////////////////////////

function resetGame() {
    draws = 0;
    dealBtn.innerHTML = "DEAL";
    reset = false;
    heldCards = 0;
    for(var i = 0; i < 5; i++) {
        usedCards.push(drawnCards[i]);
        drawnCards.splice(i, 1);
    }
    currentBet = 0;
    bets.innerHTML = 0; 
}

function cardHold(evt) {
    //Set the card to being held or not held in the grossest way possible
    var held = drawnCards[evt.id.slice(-1) - 1].held;
    if(held) {
        heldCards -= 1;
        drawnCards[evt.id.slice(-1) - 1].held = false;
        evt.selected = false;
    } else {
        heldCards += 1;
        drawnCards[evt.id.slice(-1) - 1].held = true;
        evt.selected = true;
    }
    // console.log(evt.selected);
}

function randomCard(index) {
    
    var randomCard = drawCard(index);

    //Get the string representation for the card
    var cardString = getCardString(randomCard.rank, randomCard.suit);

    //Set the background of the clicked card to the random card
    switch(index) {
        case 0:
            card1.style.backgroundImage=`url(Assets/BlackJack/Cards/${cardString})`
            break;
        case 1:
            card2.style.backgroundImage=`url(Assets/BlackJack/Cards/${cardString})`
            break;
        case 2:
            card3.style.backgroundImage=`url(Assets/BlackJack/Cards/${cardString})`
            break;
        case 3:
            card4.style.backgroundImage=`url(Assets/BlackJack/Cards/${cardString})`
            break;
        case 4:
            card5.style.backgroundImage=`url(Assets/BlackJack/Cards/${cardString})`
    }
}

//Helper function for getting a random with a certain max (non-inclusive)
function getRand(max) {
    return Math.floor(Math.random() * max);
}

//Draw a card out of the deck
function drawCard(index) {
    //Check if there are enough cards left
    if(deck.length <= 0) {
        resetDeck();
    }

    //Get random card from the deck
    var randomCard = deck[getRand(deck.length)];

    //Kinda confusing ngl
    if(drawnCards[index] == null) {
        //If no card has been drawn for that spot then just set it to a random card
        drawnCards[index] = deck.splice(deck.indexOf(randomCard), 1)[0];
    } else {
        //Else discard the current card before drawing
        usedCards.push(drawnCards[index]);
        drawnCards[index] = deck.splice(deck.indexOf(randomCard), 1)[0];
    }

    return randomCard
}

//Get the suit of the card based on a number
function getSuit(suit) {
    switch(suit) {
        case 0:
            return "Clubs";
            break;
        case 1:
            return "Diamonds";
            break;
        case 2:
            return "Hearts";
            break;
        case 3:
            return "Spades";
            break;
        default:
            return "Hearts";
            break;
    }
}

//Get the rank of the card based on a number
function getRank(rank) {
    switch(rank) {
        case 1:
            return "A";
            break;
        case 11:
            return "J";
            break;
        case 12:
            return "Q";
            break;
        case 13:
            return "K";
            break;
        default:
            return rank.toString();
            break;
    }
}

function getRankNum(rank) {
    switch(rank) {
        case "A":
            return 1;
            break;
        case "J":
            return 11;
        case "Q":
            return 12;
            break;
        case "K":
            return 13;
            break;
        default:
            return parseInt(rank);
            break;
    }
}

//Get the string representation of a card
function getCardString(rank, suit) {
    var finalString = "card";

    if(suit == "Joker") {
        return "cardJoker.png";
    }

    //Add the suit to the card string (card*Suit*)
    finalString += suit;

    //Switch on different rank possibilites and add to card string
    switch(rank) {
        case 1:
            finalString += "A.png";
            break;
        case 11:
            finalString += "J.png";
            break;
        case 12:
            finalString += "K.png";
            break;
        case 13:
            finalString += "Q.png";
            break;
        default:
            finalString += rank + ".png";
            break;
    }

    return finalString;
}