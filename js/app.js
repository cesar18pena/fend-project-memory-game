var cardList = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "bolt", "bolt",
    "anchor", "anchor", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"
];

// Array with all the cards
var deck = document.getElementsByClassName("card");

// Array with open cards ()
var openCardList = [];
// Array of Card matched correctly
var matchedCardList = [];

// Variable to count the amount of moves
var moves = 0;

// Variable to display the amount of minutes and seconds.
var minutes = 0;
var seconds = 0;

/**
 * @description Shuffles Cards
 * @param {array}
 * @returns shuffleArray 
 */

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

/**
 * @description Receive the selected card to display the icon
 * @param {event} selectedElement 
 * @returns nothings; it is a void function
 */
function openCard(selectedElement) {
    selectedElement.target.classList.add("open");
    selectedElement.target.classList.add("show");
}

// add the card to a *list* of "open" cards
function addOpenCard(element) {
    openCardList.push(element);
}

/**
 * @description Take the two selected cards and verify if they match.
 * @param {Object with first card selected} firstSelectedCard 
 * @param {Object with second card selected} secondSelectedCard 
 * @returns nothing; it is a void function
 */
function matchCards(firstSelectedCard, secondSelectedCard) {
    firstSelectedCard.classList.add("match");
    secondSelectedCard.classList.add("match");
    firstSelectedCard.classList.remove("open", "show");
    secondSelectedCard.classList.remove("open", "show");

    matchedCardList.push(firstSelectedCard, secondSelectedCard);
    openCardList = [];
}
/**
 * @description Close the two selected cards icons.
 * @param {Object with first card selected} firstSelectedCard 
 * @param {Object with second card selected} secondSelectedCard 
 * @returns nothing; it is a void function
 */
function unmatchCards(firstSelectedCard, secondSelectedCard) {
    setTimeout(function () {
        firstSelectedCard.classList.remove("open", "show");
        secondSelectedCard.classList.remove("open", "show");
        openCardList = [];
    }, 400);
}

/**
 * @description display the amount of time playing the game
 * @param 
 * @returns nothings; it is a void function
 */
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

/**
 * @description increase the amount of moves each time a card is selected
 * @param 
 * @returns Nothings; it is void
 */
function addMove() {
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
}

/**
 * @description Remove the amount of start after an specific number of moves.
 * @param 
 * @returns Nothings; it is void
 */
function removeStars() {
    if (moves % 16 === 0) {
        var star = document.getElementsByClassName("fa-star")[0];
        star.classList.remove("fa-star");
    }
}

/**
 * @description Open the model after you win the match.
 * @param 
 * @returns Nothings; it is void
 */
function openModal() {
    if (matchedCardList.length == 16) {
        $('#result').modal('show');
        document.getElementById("result-timer").innerHTML = minutes + "m " + seconds + "s";
        document.getElementsByClassName("moves")[1].innerHTML = moves;
    }
}

/**
 * @description This is called every time a card is selected
 * @param {Event} event
 * @returns Nothings; it is void
 */
function onClickCard(event) {
    openCard(event);
    addOpenCard(event.target);
    addMove();

    var firstCard = openCardList[0];
    var secondCard = openCardList[1];

    if (openCardList.length > 0) {
        if (firstCard.innerHTML == secondCard.innerHTML) {
            matchCards(firstCard, secondCard);
            openModal();
        } else {
            unmatchCards(firstCard, secondCard);
        }
    }
    removeStars();
}

/**
 * @description Start the game and reset any values to their default ones.
 * @param 
 * @returns Nothings; it is void
 */
function init() {
    shuffle(cardList);
    clearInterval(countTime);
    clearInterval(unmatchCards);

    // Putting the deck empty
    document.getElementsByClassName("deck")[0].innerHTML = "";

    // Displaying the 16 cards on screen.
    for (var i = 0; i < cardList.length; i++) {
        document.getElementsByClassName("deck")[0].innerHTML += '<li class="card"> <i class="fa fa-' + cardList[i] + '"> </i></li>';
    }

    // Add to each card an event, when it is clicked.
    for (var i = 0; i < deck.length; i++) {
        deck[i].addEventListener("click", onClickCard, false);
    }

    document.getElementsByClassName("moves")[0].innerHTML = 0;

    minutes = 0;
    seconds = 0;
    countTime();
}
