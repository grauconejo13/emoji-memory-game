  const emojiPairs = ["🐶", "🐱", "🐇", "🐻", "🐼", "🐦", "🐷", "🦄"];
  let emojis, memoryGame, flippedCards, matchedPairs;

  // Initialize the game
  function initGame() {
      emojis = [...emojiPairs, ...emojiPairs]; // Duplicate emojis for pairs
      emojis.sort(() => 0.5 - Math.random()); // Shuffle emojis

      flippedCards = [];
      matchedPairs = 0;
      /*grauconejo13 - Vanessa Victorino ---*/
      memoryGame.innerHTML = ''; // Clear the game board

      emojis.forEach((emoji) => {
          const card = document.createElement('div');
          card.classList.add('memory-card');
          card.dataset.emoji = emoji;
          card.innerHTML = `<span style="visibility: hidden;">${emoji}</span>`;
          memoryGame.appendChild(card);
      });
  }
  /*grauconejo13 - Vanessa Victorino --*/
  // Handle card flipping
  function handleCardFlip(event) {
      const clickedCard = event.target.closest('.memory-card');

      if (!clickedCard || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
          return;
      }

      flippedCards.push(clickedCard);
      clickedCard.classList.add('flipped');
      clickedCard.firstChild.style.visibility = 'visible';

      if (flippedCards.length === 2) {
          checkMatch();
      }
  }

  // Check if two flipped cards match
  function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.emoji === card2.dataset.emoji) {
          card1.classList.add('matched');
          card2.classList.add('matched');
          matchedPairs++;
          if (matchedPairs === emojiPairs.length) {
              setTimeout(() => alert('You win! 🎉'), 500);
          }
      } else {
          setTimeout(() => {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              card1.firstChild.style.visibility = 'hidden';
              card2.firstChild.style.visibility = 'hidden';
          }, 1000);
      }
      flippedCards = [];
  }

  // Add event listeners
  document.addEventListener('DOMContentLoaded', () => {
      memoryGame = document.getElementById('memoryGame');

      // Reset button functionality
      document.getElementById('resetButton').addEventListener('click', initGame);

      // Flip card on click
      memoryGame.addEventListener('click', handleCardFlip);

      // Initialize the game for the first time
      initGame();
  });