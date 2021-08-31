let bankCash = Number(sessionStorage.getItem('bankCash'));
let cashOnHand = Number(sessionStorage.getItem('cashOnHand'));
let bankTxt = document.getElementById("bank");
const bets = document.getElementById("bets");

let winningsTxt = document.getElementById("winnings");

let dealBtn = document.getElementById("playBtn")
let hitBtn = document.getElementById("hitBtn")
let standBtn = document.getElementById("standBtn")

let originalAmount = cashOnHand;
var currentBet = 0;
let winnings = 0;
let tempCurrentBet = 0;
bankTxt.innerHTML = `$${cashOnHand}`;

let isStarted = false;

let pCard1 = document.getElementById("pCard1");
let pCard2 = document.getElementById("pCard2");
let pCard3 = document.getElementById("pCard3");
let pCard4 = document.getElementById("pCard4");
let pCard5 = document.getElementById("pCard5");

let hCard1 = document.getElementById("hCard1");
let hCard2 = document.getElementById("hCard2");
let hCard3 = document.getElementById("hCard3");
let hCard4 = document.getElementById("hCard4");
let hCard5 = document.getElementById("hCard5");
let playerCardCount = 1;
let houseCardCount = 1;

let playerScoreTxt = document.getElementById("playerScore");
let houseScoreTxt = document.getElementById("houseScore");

let resultTxt = document.getElementById("result");

var currentPlayer = 0;

function chipSelect(evt) {

    if(isStarted == false) {
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
    else if(isStarted){
        alert("You can't bet more once you have started the game");
    }
}

function bet(amount) {
    
    tempCurrentBet += amount;
    console.log(tempCurrentBet);
    if(tempCurrentBet <= originalAmount) {
        currentBet += amount;
        cashOnHand -= amount;
        sessionStorage.setItem('cashOnHand', cashOnHand);
        bank.innerHTML = `$${cashOnHand}`;
        bets.innerHTML = `$${currentBet}`;
    } else if(tempCurrentBet > originalAmount) {
        alert("Not enough money!");
        tempCurrentBet = currentBet;
    }
}

var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

function shuffle()
{
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

var players = new Array();

function createPlayers(num)
{
    players = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

function startblackjack()
{
    pCard1.style.visibility = "hidden";
    pCard2.style.visibility = "hidden";
    pCard3.style.visibility = "hidden";
    pCard4.style.visibility = "hidden";
    pCard5.style.visibility = "hidden";

    hCard1.style.visibility = "hidden";
    hCard2.style.visibility = "hidden";
    hCard3.style.visibility = "hidden";
    hCard4.style.visibility = "hidden";
    hCard5.style.visibility = "hidden";

    dealBtn.style.visibility = "hidden";
    resultTxt.style.visibility = "hidden";
    hitBtn.style.visibility = "visible";
    standBtn.style.visibility = "visible";
    isStarted = true;

    
    winningsTxt.innerHTML = "$0";
    //document.getElementById("status").style.display="none";
    // deal 2 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    playerScoreTxt.style.visibility = "visible";
    houseScoreTxt.style.visibility = "visible";
    dealHands();
}

function dealHands()
{
    // alternate handing cards to each player
    // 2 cards each
    for(var i = 0; i < 2; i++)
    {
        for (var x = 0; x < players.length; x++)
        {
            var card = deck.pop();
            console.log(card);
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
    updateDeck();
}

function renderCard(card, player)
{
    //var hand = document.getElementById('hand_' + player);
    //hand.appendChild(getCardUI(card));
    let cardLink = `Assets/BlackJack/Cards/card${card.Suit}${card.Value}.png`;
    console.log(cardLink)
    if(player === 0)
    {
        if(players[0].Hand.length === 1)
        {
            pCard1.style.visibility = "visible";
            pCard1.src = cardLink;
        }
        else if(players[0].Hand.length === 2)
        {
            pCard2.style.visibility = "visible";
            pCard2.src = cardLink;
        }
        else if(players[0].Hand.length === 3)
        {
            pCard3.style.visibility = "visible";
            pCard3.src = cardLink;
        }
        else if(players[0].Hand.length === 4)
        {
            pCard4.style.visibility = "visible";
            pCard4.src = cardLink;
        }
        else if(players[0].Hand.length === 5)
        {
            pCard5.style.visibility = "visible";
            pCard5.src = cardLink;
        }
    }
    else if(player === 1)
    {
        if(players[1].Hand.length === 1)
        {
            hCard1.style.visibility = "visible";
            hCard1.src = cardLink;
        }
        else if(players[1].Hand.length === 2)
        {
            hCard2.style.visibility = "visible";
            hCard2.src = cardLink;
        }
        else if(players[1].Hand.length === 3)
        {
            hCard3.style.visibility = "visible";
            hCard3.src = cardLink;
        }
        else if(players[1].Hand.length === 4)
        {
            hCard4.style.visibility = "visible";
            hCard4.src = cardLink;
        }
        else if(players[1].Hand.length === 5)
        {
            hCard5.style.visibility = "visible";
            hCard5.src = cardLink;
        }
    }
}

function hitMe()
{
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    
    if(currentPlayer === 0)
    {
        var card = deck.pop();
        players[currentPlayer].Hand.push(card);
        renderCard(card, currentPlayer);
        updatePoints();
        updateDeck();
        check();
    }
    else if(currentPlayer === 1)
    {
        while(players[1].Points <= 16)
        {
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();
            updateDeck();
            check();
            if(players[1].Points > 16)
            {
                break;
            }
        }
        stand();
    }
}

function check()
{
    if (players[currentPlayer].Points > 21)
    {
        end();
    }
}

function stand()
{
    // move on to next player, if any
    if (currentPlayer === 0) {
        hitBtn.style.visibility = "hidden"
        standBtn.style.visibility = "hidden";
        currentPlayer++;
        hitMe();
    }
    else {
        end();
    }
}

function end()
{
    resultTxt.style.visibility = "visible";
    if (players[0].Points > players[1].Points && players[0].Points < 22 && players[1].Points < 22)
    {
        winnings = currentBet;
        if(players[0].Hand.length === 5 && players[0].Points <= 21)
        {
            winnings = winnings * 3;
        }
        else if(players[0].Points === 21)
        {
            winnings = winnings * 2;
        }
        resultTxt.innerHTML = " You Win! "
        
    }
    else if(players[1].Points > players[0].Points && players[1].Points < 22 && players[0].Points < 22){
        winnings = 0;
        winningsTxt.innerHTML = `${winnings}`;
        resultTxt.innerHTML = " You Lose... "
    }
    else if(players[0].Points > 21)
    {
        resultTxt.innerHTML = " You Lose... "
        winnings = 0;
        winningsTxt.innerHTML = `${winnings}`;
    }
    else if(players[1].Points > 21 || players[0].Points === players[1].Points)
    {
        winnings = currentBet;
        if(players[1].Points > 21)
        {
            resultTxt.innerHTML = " You Win! "
        }
        else if(players[0].Points === players[1].Points){
            resultTxt.innerHTML = " It's a Draw ";
        }
    }

    bets.innerHTML = "0";
    hitBtn.style.visibility = "hidden"
    standBtn.style.visibility = "hidden";
    dealBtn.style.visibility = "visible";
    winningsTxt.innerHTML = `$${winnings}`;
    cashOnHand += winnings;
    sessionStorage.setItem('cashOnHand', cashOnHand);
    bankTxt.innerHTML = `$${cashOnHand}`;
    isStarted = false;
    players = new Array();
    originalAmount = cashOnHand;

    currentBet = 0;
    winnings = 0;
}

function getPoints(player)
{
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++)
    {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}


function updatePoints()
{
    for (var i = 0 ; i < players.length; i++)
    {
        getPoints(i);
        if(i === 0)
        {
            playerScoreTxt.innerHTML = players[i].Points;
        }
        else if(i === 1)
        {
            houseScoreTxt.innerHTML = players[i].Points;
        }
        //document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function updateDeck()
{
    document.getElementById('deckcount').innerHTML = deck.length;
}