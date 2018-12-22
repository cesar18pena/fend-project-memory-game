/*
    Paso 1
 * Create a list that holds all of your cards
 */

/*
   Paso 2
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

/*
    Paso 3
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// display the card's symbol
function openCard(event) {
    event.target.classList.add("open");
    event.target.classList.add("show");
}

// add the card to a *list* of "open" cards
function addOpenCard(element) {
    openCardList.push(element);
}

function matchCards(element1, element2) {
    element1.classList.add("match");
    element2.classList.add("match");
    element1.classList.remove("open", "show");
    element2.classList.remove("open", "show");
    openCardList = [];
}

function unmatchCards(element1, element2) {
    setTimeout(function () {
        element1.classList.remove("open", "show");
        element2.classList.remove("open", "show");
        openCardList = [];
    }, 500);
}

function countTime() {
    setInterval(function () {
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s";
        seconds++;

        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

function addMove() {
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
}

function removeStars() {
    if (moves % 10 === 0) {
        var star = document.getElementsByClassName("fa-star")[0];
        star.classList.remove("fa-star");
        star.classList.add("fa-star-o");
    }
}

// General
function onClickCard(event) {
    openCard(event);
    addOpenCard(event.target);
    addMove();

    if (openCardList.length > 0) {
        if (openCardList[0].innerHTML == openCardList[1].innerHTML) {
            matchCards(openCardList[0], openCardList[1]);
        } else {
            unmatchCards(openCardList[0], openCardList[1]);
        }
    }

    removeStars();
}

var cardList = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "bolt", "bolt",
    "anchor", "anchor", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"
];

var allElements = document.getElementsByClassName("card");
var openCardList = [];
var minutes = 0;
var seconds = 0;
var moves = 0;

function init() {
    shuffle(cardList);

    document.getElementsByClassName("deck")[0].innerHTML = "";

    for (var i = 0; i < cardList.length; i++) {
        document.getElementsByClassName("deck")[0].innerHTML +=
            '<li class="card"> <i class="fa fa-' + cardList[i] + '"> </i></li>';
    }

    for (var i = 0; i < allElements.length; i++) {
        allElements[i].addEventListener("click", onClickCard, false);
    }

    minutes = 0;
    seconds = 0;
    countTime();
}
