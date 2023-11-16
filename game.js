const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍍', '🍉'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  const symbolElement = document.createElement('div');
  symbolElement.classList.add('symbol');
  symbolElement.innerHTML = symbol;
  card.appendChild(symbolElement);
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.querySelector('.symbol').innerHTML === card2.querySelector('.symbol').innerHTML) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      alert('Congratulations! You matched all the cards!');
      resetGame();
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

function resetGame() {
  cards = [...symbols, ...symbols];
  flippedCards = [];
  matchedCards = [];
  gameContainer.innerHTML = '';
  startGame();
}

function startGame() {
  shuffle(cards);
  const board = document.createElement('div');
  board.classList.add('board');
  cards.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });
  gameContainer.appendChild(board);
}

const gameContainer = document.getElementById('game-container');
startGame();
