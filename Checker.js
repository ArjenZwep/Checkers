// Eerst maken we het bord aan in een 64 item array dit bord zal hetzelfde gevuld zijn als de html table
//"use strict";

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];

//De functie voor het omzetten van pieceid tot een integer
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

//DOM refrenties, waar we de html linken aan de javascript logic
const cells = document.getElementsByTagName("td");
let whitePieces = document.getElementsByClassName("white-piece");
let blackPieces = document.getElementsByClassName("black-piece");
const TurnText = document.getElementsByClassName("who-turn");

//player status, bepaald wie er is en hoeveel punten elk heeft
let turn = true;
let whitePieceAm = 12; //begint met 12 omdat je 12 pieces hebt
let blackPieceAm = 12;
let playerPieces;

//Hier maken we een object die de status van een geselecteerd steen bevat
let selectedPiece = {
    pieceId: -1,
    indexOnBoard: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minSevSpace: false,
    minNinthSpace: false,
    minFourthSpace: false,
    minEigthSpace: false,
    hitOption: false
};

//Deze functie zorgt ervoor dat een steen geselecteerd kan worden
function SelectPiece(){
    if (turn){ //checken wie zijn beurt het is, true is white en false is black
        for (let i = 0; i < whitePieces.length; i++){
            whitePieces[i].addEventListener("click", getPlayerPieces); //Alle pieces worden klikbaar
        }
    } else {
        for (let i=0; i < blackPieces.length; i++){
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}


//Doet de steenken van de speler die aan de beurt is in de playerPieces variable
function getPlayerPieces(){
    if (turn){
        playerPieces = whitePieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellonclick();
    resetBorders();
}

//Dit is zodra er een steen geselecteerd wordt worden de andere cellen niet meer klikbaar
//hierna kunnen we speficieke beurten gaan selecteren die wel kunnen
function removeCellonclick(){
    for (let i = 0; i < cells.length; i++){
        cells[i].removeAttribute("onclick");
    }
}

//Dit is alle omringingen van de steenken weer goed zetten na het selecten van een steen
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}


//Deze functie reset alle attributen van een steen
function resetSelectedPieceProperties(){
    selectedPiece.pieceId = -1,
    selectedPiece.indexOnBoard = -1,
    selectedPiece.isKing = false,
    selectedPiece.seventhSpace = false,
    selectedPiece.ninthSpace = false,
    selectedPiece.fourteenthSpace = false,
    selectedPiece.eighteenthSpace = false,
    selectedPiece.minSevSpace = false,
    selectedPiece.minNinthSpace = false,
    selectedPiece.minFourthSpace = false,
    selectedPiece.minEigthSpace = false,
    selectedPiece.hitOption = false
}

//Hiermee kan een steen geselecteerd worden
function getSelectedPiece(){

    /*met dit steen wordt gecheckt of er een slag geslagen kan worden, disabled omdat hij nog niet af is
    let canTake = pieceCanTake();
    if (canTake.includes(parseInt(event.target.id) !== true){
        return;
    }*/

    selectedPiece.pieceId = parseInt(event.target.id); //Het aangeklikte id wordt omgezet in een int
    selectedPiece.indexOnBoard = findPiece(selectedPiece.pieceId); //Hier kijken we waar op het bord het steen staat
    isKing(); //een check of het een koning is
    getAvailableSpaces();
    //console.log("hier ook3")
}

/*De functie om te checken of er geslagen kan worden, disabled omdat hij nog niet af is
function pieceCanTake(){
    for(let i = 0, i < whitePieces.length)
    //Hier moet gechekt worden welke piece ids een slag kunnen slaan
    //Hier moet een array returned worden met alle id's die een slag kunnen slaan
} */

//koningcheck functie
function isKing(){
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")){
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
}

//De functie voor het zien welke moves het steen kan maken
function getAvailableSpaces(){
    if (board[selectedPiece.indexOnBoard + 7] === null && cells[selectedPiece.indexOnBoard + 7].classList.contains("Whitespot") !== true){
            selectedPiece.seventhSpace = true;
        }
    if (board[selectedPiece.indexOnBoard + 9] === null && cells[selectedPiece.indexOnBoard + 9].classList.contains("Whitespot") !== true)
        {
            selectedPiece.ninthSpace = true;
        }
    if (board[selectedPiece.indexOnBoard - 7] === null && cells[selectedPiece.indexOnBoard - 7].classList.contains("Whitespot") !== true)
        {
            selectedPiece.minSevSpace = true;
        }
    if (board[selectedPiece.indexOnBoard - 9] === null && cells[selectedPiece.indexOnBoard - 9].classList.contains("Whitespot") !== true){
            selectedPiece.minNinthSpace = true;
        }   
        getJumpSpaces();
}

//De functie voor om te zien welke jumpmoves het steen kan maken
function getJumpSpaces(){
    if (turn) {
        if (board[selectedPiece.indexOnBoard + 14] === null &&
            cells[selectedPiece.indexOnBoard + 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 7] >= 12) {
                selectedPiece.fourteenthSpace = true;
                selectedPiece.hitOption = true;
            }
        if (board[selectedPiece.indexOnBoard + 18] === null &&
            cells[selectedPiece.indexOnBoard + 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 9] >= 12) {
                selectedPiece.eighteenthSpace = true;
                selectedPiece.hitOption = true; 
            }
        if (board[selectedPiece.indexOnBoard - 14] === null &&
            cells[selectedPiece.indexOnBoard - 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 7] >= 12) {
                selectedPiece.minFourthSpace = true;
                selectedPiece.hitOption = true;
            }
        if (board[selectedPiece.indexOnBoard - 18] === null &&
            cells[selectedPiece.indexOnBoard - 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 9] >= 12) {
                selectedPiece.minEigthSpace = true;
                selectedPiece.hitOption = true; 
            }        
    } else {
        if (board[selectedPiece.indexOnBoard + 14] === null &&
            cells[selectedPiece.indexOnBoard + 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 7] < 12 && board[selectedPiece.indexOnBoard + 7] !== null){
                selectedPiece.fourteenthSpace = true;
                selectedPiece.hitOption = true;
            }
        if (board[selectedPiece.indexOnBoard + 18] === null &&
            cells[selectedPiece.indexOnBoard + 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 9] < 12 && board[selectedPiece.indexOnBoard + 9] !== null){
                selectedPiece.eighteenthSpace = true;
                selectedPiece.hitOption = true;
            }
        if (board[selectedPiece.indexOnBoard - 14] === null &&
            cells[selectedPiece.indexOnBoard - 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 7] < 12 && board[selectedPiece.indexOnBoard - 7] !== null){
                selectedPiece.minFourthSpace = true;
                selectedPiece.hitOption = true;
            }
        if (board[selectedPiece.indexOnBoard - 18] === null &&
            cells[selectedPiece.indexOnBoard - 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 9] < 12 && board[selectedPiece.indexOnBoard - 9] !== null){
                selectedPiece.minEigthSpace = true;
                selectedPiece.hitOption = true;
            }
    }
    moveBackward();
}

//Hier wordt gechekt of het steen nog een keer kan slaan
function getJumpSpacesCheck(){
    if (turn) {
        selectedPiece.fourteenthSpace = (board[selectedPiece.indexOnBoard + 14] === null &&
            cells[selectedPiece.indexOnBoard + 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 7] >= 12);

        selectedPiece.eighteenthSpace = (board[selectedPiece.indexOnBoard + 18] === null &&
            cells[selectedPiece.indexOnBoard + 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard + 9] >= 12);

        if(selectedPiece.isKing){
            selectedPiece.minFourthSpace =  (board[selectedPiece.indexOnBoard - 14] === null &&
                cells[selectedPiece.indexOnBoard - 14].classList.contains("Whitespot") !== true &&
                board[selectedPiece.indexOnBoard - 7] >= 12);

            selectedPiece.minEigthSpace = (board[selectedPiece.indexOnBoard - 18] === null &&
                cells[selectedPiece.indexOnBoard - 18].classList.contains("Whitespot") !== true &&
                board[selectedPiece.indexOnBoard - 9] >= 12);
        }
    } else { //zelfde logica voor zwart alleen omgedraaid
        if(selectedPiece.isKing){
            selectedPiece.fourteenthSpace = (board[selectedPiece.indexOnBoard + 14] === null &&
                cells[selectedPiece.indexOnBoard + 14].classList.contains("Whitespot") !== true &&
                board[selectedPiece.indexOnBoard + 7] < 12 && board[selectedPiece.indexOnBoard + 7] !== null)

            selectedPiece.eighteenthSpace = (board[selectedPiece.indexOnBoard + 18] === null &&
                cells[selectedPiece.indexOnBoard + 18].classList.contains("Whitespot") !== true &&
                board[selectedPiece.indexOnBoard + 9] < 12 && board[selectedPiece.indexOnBoard + 9] !== null)
        }
        selectedPiece.minFourthSpace = (board[selectedPiece.indexOnBoard - 14] === null &&
            cells[selectedPiece.indexOnBoard - 14].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 7] < 12 && board[selectedPiece.indexOnBoard - 7] !== null)

        selectedPiece.minEigthSpace = (board[selectedPiece.indexOnBoard - 18] === null &&
            cells[selectedPiece.indexOnBoard - 18].classList.contains("Whitespot") !== true &&
            board[selectedPiece.indexOnBoard - 9] < 12 && board[selectedPiece.indexOnBoard - 9] !== null)
    }
}

// deze functie gaat na of het een dam is, als dat niet zo is kan het steen niet achteruit bewegen
function moveBackward() {
    if (selectedPiece.isKing) {
        haveToHit();
    } else {
        if (turn){ //achteruit stappen uitzetten
            selectedPiece.minSevSpace = false;
            selectedPiece.minNinthSpace = false;
            selectedPiece.minFourthSpace = false;
            selectedPiece.minEigthSpace = false;
        }
        else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        haveToHit();
    }
}

//Checked of het steen kan slaan, dan moet het namelijk ook slaan
function haveToHit(){
    if(turn){
        if(selectedPiece.isKing){
            if (selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minEigthSpace || selectedPiece.minFourthSpace){
            selectedPiece.seventhSpace = false; //normale stappen uitzetten
            selectedPiece.ninthSpace = false;
            selectedPiece.minSevSpace = false;
            selectedPiece.minNinthSpace = false;
            }
        }
        if (selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace){ //Checken of het steen kan slaan
            selectedPiece.seventhSpace = false; //normale stappen uitzetten
            selectedPiece.ninthSpace = false;
            giveMovement();
        } else {
            giveMovement();
        }
    } else{
        if(selectedPiece.isKing){
            if (selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minEigthSpace || selectedPiece.minFourthSpace){
            selectedPiece.seventhSpace = false; //normale stappen uitzetten
            selectedPiece.ninthSpace = false;
            selectedPiece.minSevSpace = false;
            selectedPiece.minNinthSpace = false;
            }
        }
        if(selectedPiece.minFourthSpace || selectedPiece.minEigthSpace){
            selectedPiece.minSevSpace = false;
            selectedPiece.minNinthSpace = false;
            giveMovement();
        } else {
            giveMovement();
        }
        }
}

//deze functie selecteert de dam als hij een mogelijkheidheeft om te bewegen
function giveMovement(){
    resetBackgroundColor();
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
        || selectedPiece.minSevSpace || selectedPiece.minNinthSpace || selectedPiece.minEigthSpace || selectedPiece.minFourthSpace){
            document.getElementById(selectedPiece.pieceId).style.border = "1px solid green";
            giveCellsClick();
        } else {
            return;
        }
}

//Deze functie checkt of de plek beschikbaar is, als dat zo is krijgt die cell een click command
function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOnBoard + 7].setAttribute("onClick", "makeMove(7)"); // Geef het board move functie
        cells[selectedPiece.indexOnBoard + 7].style.backgroundColor = "goldenrod"; // geef een indicatorkleur van waar de dam heenkan
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOnBoard + 9].setAttribute("onClick", "makeMove(9)");
        cells[selectedPiece.indexOnBoard + 9].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOnBoard + 14].setAttribute("onClick", "makeMove(14)");
        cells[selectedPiece.indexOnBoard + 14].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOnBoard + 18].setAttribute("onClick", "makeMove(18)");
        cells[selectedPiece.indexOnBoard + 18].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.minSevSpace) {
        cells[selectedPiece.indexOnBoard - 7].setAttribute("onClick", "makeMove(-7)");
        cells[selectedPiece.indexOnBoard - 7].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.minNinthSpace) {
        cells[selectedPiece.indexOnBoard - 9].setAttribute("onClick", "makeMove(-9)");
        cells[selectedPiece.indexOnBoard - 9].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.minFourthSpace) {
        cells[selectedPiece.indexOnBoard - 14].setAttribute("onClick", "makeMove(-14)");
        cells[selectedPiece.indexOnBoard - 14].style.backgroundColor = "goldenrod";
    }
    if (selectedPiece.minEigthSpace) {
        cells[selectedPiece.indexOnBoard - 18].setAttribute("onClick", "makeMove(-18)");
        cells[selectedPiece.indexOnBoard - 18].style.backgroundColor = "goldenrod";
    }
}

//De functie die het steen beweegt door het updaten van de html atrributen
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOnBoard].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOnBoard + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`; //Hier wordt de nieuwe plek html gegeven
            whitePieces = document.getElementsByClassName("white-piece");
        } else {
            cells[selectedPiece.indexOnBoard + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
            whitePieces = document.getElementsByClassName("white-piece");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOnBoard + number].innerHTML = `<p class="black-piece king" id="${selectedPiece.pieceId}"></p>`;
            blackPieces = document.getElementsByClassName("black-piece");
        } else {
            cells[selectedPiece.indexOnBoard + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
            blackPieces = document.getElementsByClassName("black-piece");
        }
    }

    let indexOfPiece = selectedPiece.indexOnBoard;
    if (number === 14 || number === -14 || number === 18 || number === -18){ //Bij het slaan van een steen moet er een 3de argument komen
        updateBoard(indexOfPiece, indexOfPiece + number, indexOfPiece + (number /2));
    }
    else {
        updateBoard(indexOfPiece, indexOfPiece + number);
    }
}

//Deze functie veranderd het bord na een slag en update de score
function updateBoard(currentIndex, newIndex, removePiece){
    board[currentIndex] = null; //steen weghalen op huidge plek
    board[newIndex] = parseInt(selectedPiece.pieceId); //steen op updated id neerzetten
    selectedPiece.indexOnBoard = newIndex;
    if (turn && selectedPiece.pieceId < 12 && newIndex >= 57){
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    } //maak een dam van het steen als het op de laatste rij komt
    if (turn === false && selectedPiece.pieceId >= 12 && newIndex <= 7){
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    // deze if activeert bij 3de argument, als er een steen geslagen wordt
    if (removePiece){
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackPieceAm --
            getJumpSpacesCheck(); // een check of het steen nog een keer kan slaan als het true is gaat de logica terug naar de giveCellsClick functie
            if(selectedPiece.minEigthSpace === true || selectedPiece.minFourthSpace === true || selectedPiece.eighteenthSpace === true || selectedPiece.fourteenthSpace === true){
                giveCellsClick();
                return;
            }
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            whitePieceAm --
            getJumpSpacesCheck();
            if(selectedPiece.minEigthSpace === true || selectedPiece.minFourthSpace === true || selectedPiece.eighteenthSpace === true || selectedPiece.fourteenthSpace === true){
                giveCellsClick();
                return;
            }
        }
    }
    resetBackgroundColor(); //De achtergrond kleuren weer goedzetten
    resetSelectedPieceProperties(); //Het object weer terug naar standaard zetten
    removeCellonclick();
    removeEventListener();
}

//Deze functie zorgt ervoor dat alle spots weer bruin worden
function resetBackgroundColor(number){
    for (let i = 1; i < 8; i+=2){
        cells[i].style.backgroundColor = '#592500'; //verschillende loopjes voor elke rij zodat er geen witte bijkomen
    }
    for (let i = 8; i < 16; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 17; i < 24; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 24; i < 32; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 33; i < 40; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 40; i < 48; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 49; i < 56; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
    for (let i = 56; i < 64; i+=2){
        cells[i].style.backgroundColor = '#592500';
    }
}

//haalt de klikbare events weg die in givecellsclick worden aangemaakt
function removeEventListener(){
    if (turn){
        for (let i = 0; i < whitePieces.length; i++){
            whitePieces[i].removeEventListener("click", getPlayerPieces); //loopt over alle steenken om bij elke events weg te halen
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++){
            blackPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

//Checkt of er al iemand heeft gewonnen
function checkForWin(){
    if(blackPieceAm === 0){
        TurnText[0].innerHTML = "<h3>Wit heeft gewonnen!</h3>";
    }
    else if (whitePieceAm === 0){
        TurnText[0].innerHTML = "<h3>Zwart heeft gewonnen!</h3>";
    }
    else{
        changePlayer();
    }
}

//Switched de actieve speler
function changePlayer(){
    if (turn){
        turn = false;
        TurnText[0].innerHTML = "<h3>Zwart is aan zet</h3>";
    } else {
        turn = true;
        TurnText[0].innerHTML = "<h3>Wit is aan zet</h3>";
    }
    SelectPiece();
}