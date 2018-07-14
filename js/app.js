/*Memory Game by Mila K-L */
/*May 2018*/

/*
 * Creating a list that holds all cards - array "deck"
 */

const documentDeck = document.querySelector('.deck');

class Card {
  constructor(identifier, imageSource) {
    this.identifier = identifier;
    this.imageSource = imageSource;
    this.isOpen = false;
    this.isMatch = false;

  }
}

let deck = [];

function makeNewDeck() {
  deck = [
    new Card(1, 'img/svg/fox.svg'),
    new Card(2, 'img/svg/fox.svg'),
    new Card(3, 'img/svg/lemur.svg'),
    new Card(4, 'img/svg/lemur.svg'),
    new Card(5, 'img/svg/pig.svg'),
    new Card(6, 'img/svg/pig.svg'),
    new Card(7, 'img/svg/tiger.svg'),
    new Card(8, 'img/svg/tiger.svg'),
    new Card(9, 'img/svg/koala.svg'),
    new Card(10, 'img/svg/koala.svg'),
    new Card(11, 'img/svg/bull.svg'),
    new Card(12, 'img/svg/bull.svg'),
    new Card(13, 'img/svg/zebra.svg'),
    new Card(14, 'img/svg/zebra.svg'),
    new Card(15, 'img/svg/hippopotamus.svg'),
    new Card(16, 'img/svg/hippopotamus.svg'),
  ];
}

/*
 * Display the cards on the page
 */

function displayDeck() {
  $('.deck').empty();
  for (let card of deck) {
    let cardElement = document.createElement('li');
    documentDeck.appendChild(cardElement);
    cardElement.setAttribute('class', 'card');
    cardElement.setAttribute('id', card.identifier);
    let imageElement = document.createElement('img');
    cardElement.appendChild(imageElement);
    imageElement.setAttribute('class', 'cardImage');
    imageElement.setAttribute('src', card.imageSource);


    // flip card on click
    cardElement.addEventListener("click", function(event) {
      event.preventDefault();
      if (card.isOpen === true) {
        return;
      }
      timer.start();
      moves++;
      cardElement.setAttribute('class', 'card open show');
      card.isOpen = true;
      checkCardState();
      showCounter();
    });
  }
}

$(document).ready(function() {
  restartGame();
  timer.stop();
});

function checkCardState() {
  let openNumber = 0;
  let openOnDeck = [];
  for (let card of deck) {
    if (card.isOpen === true && card.isMatch === false) {
      openNumber += 1;
      openOnDeck.push(card)
    } else if (card.isOpen === true && card.isMatch === true) {
      openNumber += 1;

    }

  }
  if (openOnDeck.length > 1) {
    isMatched(openOnDeck[0], openOnDeck[1]);

    setTimeout(function() {
      closeAllCards();
    }, 900);
  }


  if (openNumber === deck.length) {
    gameOver();
  }
}


function closeAllCards() {
  for (let card of deck) {
    if (card.isOpen === true && card.isMatch === false) {
      let cardElement = document.getElementById(card.identifier);
      cardElement.setAttribute('class', 'card');
      card.isOpen = false;
    }
  }
}


function isMatched(a, b) {
  if (a.imageSource === b.imageSource) {
    let firstCard = document.getElementById(a.identifier);
    let secondCard = document.getElementById(b.identifier);

    setTimeout(function() {
      firstCard.setAttribute('class', 'card show matchedZoom match');
      secondCard.setAttribute('class', 'card show matchedZoom match');
    }, 1100);

    a.isMatch = true;
    b.isMatch = true;

  }
}

//Finish of the game
const modal = document.getElementById('gameOverModal');
const span = document.getElementsByClassName("close")[0];

function gameOver() {
  let starRating = getRating();
  if (starRating === 3) {
    $(".finalRating").find(".fa-star").css("color", "#ffe121");

  } else if (starRating === 2) {
    $(".finalRating").find(".third ").css("color", "black");

  } else {
    $(".finalRating").find(".second ").css("color", "black");


  }

  $('#totalTime .hours').html(timer.getTimeValues().hours);
  $('#totalTime .minutes').html(timer.getTimeValues().minutes);
  $('#totalTime .seconds').html(timer.getTimeValues().seconds);
  $('.totalMoves').html(parseInt(moves / 2));

  setTimeout(function() {
    modal.style.display = "block";
  }, 2300);
  console.log("Timer says " + timer.getTimeValues());

  timer.stop();
}

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

  console.log(array);

  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Restart game
const restart = document.querySelector(".restart");
const playAgain = document.querySelector("button");

function restartGame() {
  makeNewDeck();
  timer.reset();
  timer.stop();
  $('#gameTimer').html(timer.getTimeValues().toString());
  moves = 0;
  showCounter();
  shuffle(deck);
  displayDeck();
}

restart.onclick = function() {
  restartGame();
}

playAgain.onclick = function() {
  modal.style.display = "none";
  restartGame();
}


// Moves counter
let moves = 0;
let counter = document.querySelector(".moves");

function showCounter() {
  counter.innerHTML = parseInt(moves / 2);
  let starRating = getRating();
  // Star rating
  if (starRating === 3) {
    $(".stars").find(".fa-star").css("color", "#ffe121");

  } else if (starRating === 2) {
    $(".stars").find(".third ").css("color", "black");

  } else {
    $(".stars").find(".second ").css("color", "black");

  }
}

function getRating() {
  if (moves / 2 <= ((deck.length / 2) + 2)) {
    return 3;
  } else if (moves / 2 <= ((deck.length / 2) + 5)) {
    return 2;
  } else {
    return 1;

  }

}

//Timer
let timer = new Timer();
timer.addEventListener('secondsUpdated', function(e) {
  $('#gameTimer').html(timer.getTimeValues().toString());
});
