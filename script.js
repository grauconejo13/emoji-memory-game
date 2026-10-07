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
          card.setAttribute('role', 'button');
          card.setAttribute('tabindex', '0');
          card.setAttribute('aria-label', 'Hidden memory card');
          card.innerHTML = `<span style="visibility: hidden;" aria-hidden="true">${emoji}</span>`;
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
      clickedCard.setAttribute('aria-label', `Revealed card ${clickedCard.dataset.emoji}`);

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
          card1.setAttribute('aria-label', `Matched card ${card1.dataset.emoji}`);
          card2.setAttribute('aria-label', `Matched card ${card2.dataset.emoji}`);
          card1.setAttribute('tabindex', '-1');
          card2.setAttribute('tabindex', '-1');
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
              card1.setAttribute('aria-label', 'Hidden memory card');
              card2.setAttribute('aria-label', 'Hidden memory card');
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

      // Flip focused cards with Enter or Space
      memoryGame.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') {
              return;
          }

          const focusedCard = event.target.closest('.memory-card');
          if (!focusedCard) {
              return;
          }

          event.preventDefault();
          handleCardFlip({ target: focusedCard });
      });

      // Initialize the game for the first time
      initGame();
  });