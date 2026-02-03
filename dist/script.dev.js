"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var emojiPairs = ["🐶", "🐱", "🐇", "🐻", "🐼", "🐦", "🐷", "🦄"];
var emojis, memoryGame, flippedCards, matchedPairs; // Initialize the game

function initGame() {
  emojis = [].concat(emojiPairs, emojiPairs); // Duplicate emojis for pairs

  emojis.sort(function () {
    return 0.5 - Math.random();
  }); // Shuffle emojis

  flippedCards = [];
  matchedPairs = 0;
  /*grauconejo13 - Vanessa Victorino ---*/

  memoryGame.innerHTML = ''; // Clear the game board

  emojis.forEach(function (emoji) {
    var card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.emoji = emoji;
    card.innerHTML = "<span style=\"visibility: hidden;\">".concat(emoji, "</span>");
    memoryGame.appendChild(card);
  });
}
/*grauconejo13 - Vanessa Victorino --*/
// Handle card flipping


function handleCardFlip(event) {
  var clickedCard = event.target.closest('.memory-card');

  if (!clickedCard || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
    return;
  }

  flippedCards.push(clickedCard);
  clickedCard.classList.add('flipped');
  clickedCard.firstChild.style.visibility = 'visible';

  if (flippedCards.length === 2) {
    checkMatch();
  }
} // Check if two flipped cards match


function checkMatch() {
  var _flippedCards = flippedCards,
      _flippedCards2 = _slicedToArray(_flippedCards, 2),
      card1 = _flippedCards2[0],
      card2 = _flippedCards2[1];

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === emojiPairs.length) {
      setTimeout(function () {
        return alert('You win! 🎉');
      }, 500);
    }
  } else {
    setTimeout(function () {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.firstChild.style.visibility = 'hidden';
      card2.firstChild.style.visibility = 'hidden';
    }, 1000);
  }

  flippedCards = [];
} // Add event listeners


document.addEventListener('DOMContentLoaded', function () {
  memoryGame = document.getElementById('memoryGame'); // Reset button functionality

  document.getElementById('resetButton').addEventListener('click', initGame); // Flip card on click

  memoryGame.addEventListener('click', handleCardFlip); // Initialize the game for the first time

  initGame();
});
//# sourceMappingURL=script.dev.js.map
