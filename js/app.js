/*
 * Create a list that holds all of your cards - array "deck"
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
const deck = [
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


/*
 * Display the cards on the page
 *   - loop through each card?
 */

function makeDeck() {
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
      cardElement.setAttribute('class', 'card open show');
      card.isOpen = true;
      checkCardState();
    });
  }
}

$(document).ready(function() {
  makeDeck();
});

function checkCardState() {
  let openNumber = 0;
  let openOnDeck = [];
  for (let card of deck) {
    if (card.isOpen === true && card.isMatch === false) {
      openNumber += 1;
      openOnDeck.push(card)
    }

  }
  if (openNumber > 1) {
   isMatched(openOnDeck[0], openOnDeck[1]);

    setTimeout(function() {
      closeAllCards();
    }, 900);
  }
  console.log("Number of open cards is " + openNumber);
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
    firstCard.setAttribute('class', 'card show match');
    secondCard.setAttribute('class', 'card show match');
    a.isMatch = true;
    b.isMatch = true;

  }

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
