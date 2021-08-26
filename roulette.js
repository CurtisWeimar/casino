let bankCash = sessionStorage.getItem('bankCash');
let cashOnHand = sessionStorage.getItem('cashOnHand');

bankCash = bankCash - 1000;

sessionStorage.setItem("bankCash", bankCash)

console.log(bankCash);
console.log(cashOnHand);

let _1st12 = false;
let _2nd12 = false;
let _3rd12 = false;

let _1to18 = false
let even = false;
let red = false;

let _1stCol = false;
let _2ndCol = false;
let _3rdCol = false;

let is0 = false;

let bet = 1;

let box1 = 0;
let box2 = 0;
let box3 = 0;
let box4 = 0;
let box5 = 0;
let box6 = 0;
let box7 = 0;
let box8 = 0;
let box9 = 0;
let box10 = 0;
let box11 = 0;
let box12 = 0;
let box13 = 0;
let box14 = 0;
let box15 = 0;
let box16 = 0;
let box17 = 0;
let box18 = 0;
let box19 = 0;
let box20 = 0;
let box21 = 0;
let box22 = 0;
let box23 = 0;
let box24 = 0;
let box25 = 0;
let box26 = 0;
let box27 = 0;
let box28 = 0;
let box29 = 0;
let box30 = 0;
let box31 = 0;
let box32 = 0;
let box33 = 0;
let box34 = 0;
let box35 = 0;
let box36 = 0;

let _1st12Box = 0;
let _2nd12Box = 0;
let _3rd12Box = 0;

let _1to18Box = 0;
let _19to36Box = 0;

let evenBox = 0;
let oddBox = 0;

let redBox = 0;
let blackBox = 0;

let _1stColBox = 0;
let _2ndColBox = 0;
let _3rdColBox = 0;

let box0 = 0;

function bet1(){
    bet = 1;
    console.log(bet);
}

function bet5(){
    bet = 5;
    console.log(bet);
}

function bet10(){
    bet = 10;
    console.log(bet);
}

function bet20(){
    bet = 20;
    console.log(bet);
}

function bet50(){
    bet = 50;
    console.log(bet);
}

function bet100(){
    bet = 100;
    console.log(bet);
}

function bet1000(){
    bet = 1000;
    console.log(bet);
}

function bet5000(){
    bet = 5000;
    console.log(bet);
}

function betOn1(){
    box1 = box1 + bet;
    console.log(box1);
}

function betOn2(){
    box2 = box2 + bet;
    console.log(box2);
}

function betOn3(){
    box3 = box3 + bet;
    console.log(box3);
}

function betOn4(){
    box4 = box4 + bet;
    console.log(box4);
}

function betOn5(){
    box5 = box5 + bet;
    console.log(box5);
}

function betOn6(){
    box6 = box6 + bet;
    console.log(box6);
}

function betOn7(){
    box7 = box7 + bet;
    console.log(box7);
}

function betOn8(){
    box8 = box8 + bet;
    console.log(box8);
}

function betOn9(){
    box9 = box9 + bet;
    console.log(box9);
}

function betOn10(){
    box10 = box10 + bet;
    console.log(box10);
}

function betOn11(){
    box11 = box11 + bet;
    console.log(box11);
}

function betOn12(){
    box12 = box12 + bet;
    console.log(box12);
}

function betOn13(){
    box13 = box13 + bet;
    console.log(box13);
}

function betOn14(){
    box14 = box14 + bet;
    console.log(box14);
}

function betOn15(){
    box15 = box15 + bet;
    console.log(box15);
}

function betOn16(){
    box16 = box16 + bet;
    console.log(box16);
}

function betOn17(){
    box17 = box17 + bet;
    console.log(box17);
}

function betOn18(){
    box18 = box18 + bet;
    console.log(box18);
}

function betOn19(){
    box19 = box19 + bet;
    console.log(box19);
}

function betOn20(){
    box20 = box20 + bet;
    console.log(box20);
}

function betOn21(){
    box21 = box21 + bet;
    console.log(box21);
}

function betOn22(){
    box22 = box22 + bet;
    console.log(box22);
}

function betOn23(){
    box23 = box23 + bet;
    console.log(box23);
}

function betOn24(){
    box24 = box24 + bet;
    console.log(box24);
}

function betOn25(){
    box25 = box25 + bet;
    console.log(box25);
}

function betOn26(){
    box26 = box26 + bet;
    console.log(box26);
}

function betOn27(){
    box27 = box27 + bet;
    console.log(box27);
}

function betOn28(){
    box28 = box28 + bet;
    console.log(box28);
}

function betOn29(){
    box29 = box29 + bet;
    console.log(box29);
}

function betOn30(){
    box30 = box30 + bet;
    console.log(box30);
}

function betOn31(){
    box31 = box31 + bet;
    console.log(box31);
}

function betOn32(){
    box32 = box32 + bet;
    console.log(box32);
}

function betOn33(){
    box33 = box33 + bet;
    console.log(box33);
}

function betOn34(){
    box34 = box34 + bet;
    console.log(box34);
}

function betOn35(){
    box35 = box35 + bet;
    console.log(box35);
}

function betOn36(){
    box36 = box36 + bet;
    console.log(box36);
}

function betOn0(){
    box0 = box0 + bet;
    console.log(box0);
}

function betOn1stCol(){
    _1stCol = _1stCol + bet;
    console.log(_1stCol);
}

function betOn2ndCol(){
    _2ndCol = _2ndCol + bet;
    console.log(_2ndCol);
}

function betOn3rdCol(){
    _3rdCol = _3rdCol + bet;
    console.log(_3rdCol);
}

function betOn1st12(){
    _1st12Box = _1st12Box + bet;
    console.log(_1st12Box);
}

function betOn2nd12(){
    _2nd12Box = _2nd12Box + bet;
    console.log(_2nd12Box);
}

function betOn3rd12(){
    _3rd12Box = _3rd12Box + bet;
    console.log(_3rd12Box);
}

function betOn1to18(){
    _1to18Box = _1to18Box + bet;
    console.log(_1to18Box);
}

function betOnEven(){
    evenBox = evenBox + bet;
    console.log(evenBox);
}

function betOnRed(){
    redBox = redBox + bet;
    console.log(redBox);
}

function betOnBlack(){
    blackBox = blackBox + bet;
    console.log(blackBox);
}

function betOnOdd(){
    oddBox = oddBox + bet;
    console.log(oddBox);
}

function betOn19to36(){
    _19to36Box = _19to36Box + bet;
    console.log(_19to36Box);
}

function spin() {
    let rand = Math.floor(Math.random() * (37 - 0) + 0);

    _1st12 = false;
    _2nd12 = false;
    _3rd12 = false;

    if(rand >= 1 && rand <= 12){
        _1st12 = true;
    }

    if(rand >= 13 && rand <= 24){
        _2nd12 = true;
    }

    if(rand >= 25 && rand <= 36){
        _3rd12 = true;
    }

    if(rand >=1 && rand <= 18){
        _1to18 = true;
    }else{
        _1to18 = false;
    }

    if((rand % 2) == 0){
        even = true;
    }else{
        even = false;
    }

    if(
        rand == 1 || rand == 3 || rand == 5 ||
        rand == 7 || rand == 9 || rand == 12 ||
        rand == 14 || rand == 16 || rand == 18 ||
        rand == 19 || rand == 21 || rand == 23 ||
        rand == 25 || rand == 27 || rand == 30 ||
        rand == 32 || rand == 34 || rand == 36
    ){
        red = true;
    }else{
        red = false;
    }

    if(
        rand == 3 || rand == 6 ||
        rand == 9 || rand == 12 ||
        rand == 15 || rand == 18 ||
        rand == 21 || rand == 24 ||
        rand == 27 || rand == 30 ||
        rand == 33 || rand == 36
    ){
        _1stCol = true;
    }else{
        _1stCol = false;
    }

    if(
        rand == 2 || rand == 5 ||
        rand == 8 || rand == 11 ||
        rand == 14 || rand == 17 ||
        rand == 20 || rand == 23 ||
        rand == 26 || rand == 29 ||
        rand == 32 || rand == 35
    ){
        _2ndCol = true;
    }else{
        _2ndCol = false;
    }
    
    if(
        rand == 1 || rand == 4 ||
        rand == 7 || rand == 10 ||
        rand == 13 || rand == 16 ||
        rand == 19 || rand == 22 ||
        rand == 25 || rand == 28 ||
        rand == 31 || rand == 34
    ){
        _3rdCol = true;
    }else{
        _3rdCol = false;
    }

    if(rand == 0){
        is0 = true;
    }else{
        is0 = false;
    }

    console.log(rand);
    console.log("1st " + _1st12);
    console.log("2nd " + _2nd12);
    console.log("3rd " + _3rd12);
    console.log("1 - 18 " + _1to18);
    console.log("even " + even);
    console.log("red " + red);
    console.log("1st col " + _1stCol);
    console.log("2nd col " + _2ndCol);
    console.log("3rd col " + _3rdCol);
    console.log("is 0 " + is0);
    
    box1 = 0;
    box2 = 0;
    box3 = 0;
    box4 = 0;
    box5 = 0;
    box6 = 0;
    box7 = 0;
    box8 = 0;
    box9 = 0;
    box10 = 0;
    box11 = 0;
    box12 = 0;
    box13 = 0;
    box14 = 0;
    box15 = 0;
    box16 = 0;
    box17 = 0;
    box18 = 0;
    box19 = 0;
    box20 = 0;
    box21 = 0;
    box22 = 0;
    box23 = 0;
    box24 = 0;
    box25 = 0;
    box26 = 0;
    box27 = 0;
    box28 = 0;
    box29 = 0;
    box30 = 0;
    box31 = 0;
    box32 = 0;
    box33 = 0;
    box34 = 0;
    box35 = 0;
    box36 = 0;

    _1st12Box = 0;
    _2nd12Box = 0;
    _3rd12Box = 0;

    _1to18Box = 0;
    _19to36Box = 0;

    evenBox = 0;
    oddBox = 0;

    redBox = 0;
    blackBox = 0;

    _1stColBox = 0;
    _2ndColBox = 0;
    _3rdColBox = 0;

    _0Box = 0;
}