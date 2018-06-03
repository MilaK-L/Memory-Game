/*
 * Create a list that holds all of your cards - array "deck"
 */

const documentDeck = document.querySelector('.deck');

class Card {
  constructor(identifier, cardClass) {
    this.identifier = identifier;
    this.cardClass = cardClass;
  }
}
const deck = [
  new Card(1, 'fa-diamond'),
  new Card(2, 'fa-diamond'),
  new Card(3, 'fa-bomb'),
  new Card(4, 'fa-bomb'),
  new Card(3, 'fa-leaf'),
  new Card(4, 'fa-leaf'),
  new Card(3, 'fa-bolt'),
  new Card(4, 'fa-bolt'),
  new Card(3, 'fa-cube'),
  new Card(4, 'fa-cube'),
  new Card(3, 'fa-bicycle'),
  new Card(4, 'fa-bicycle'),
  new Card(3, 'fa-paper-plane-o'),
  new Card(4, 'fa-paper-plane-o'),
  new Card(3, 'fa-anchor'),
  new Card(4, 'fa-anchor'),
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
    let iconElement = document.createElement('i');
    cardElement.appendChild(iconElement);
    iconElement.setAttribute('class', `fa ${card.cardClass}`);

    cardElement.addEventListener("click", function(event) {
      event.preventDefault();
      cardElement.setAttribute('class','card open show');
    });
  }
}

$(document).ready(function() {
  makeDeck();
});

// flip card on click






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
