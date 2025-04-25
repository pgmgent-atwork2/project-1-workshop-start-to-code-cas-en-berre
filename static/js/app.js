// Game visuals

// Array of cards with emojis
const cards = [
  { id: 1, value: 'dog', emoji: '🐶' },
  { id: 2, value: 'dog', emoji: '🐶' },
  { id: 3, value: 'cat', emoji: '🐱' },
  { id: 4, value: 'cat', emoji: '🐱' },
  { id: 5, value: 'fish', emoji: '🐟' },
  { id: 6, value: 'fish', emoji: '🐟' },
  { id: 7, value: 'bird', emoji: '🐦' },
  { id: 8, value: 'bird', emoji: '🐦' },
  { id: 9, value: 'lizard', emoji: '🦎' },
  { id: 10, value: 'lizard', emoji: '🦎' },
  { id: 11, value: 'turtle', emoji: '🐢' },
  { id: 12, value: 'turtle', emoji: '🐢' },
  { id: 13, value: 'rabbit', emoji: '🐰' },
  { id: 14, value: 'rabbit', emoji: '🐰' },
  { id: 15, value: 'hamster', emoji: '🐹' },
  { id: 16, value: 'hamster', emoji: '🐹' },
  { id: 17, value: 'frog', emoji: '🐸' },
  { id: 18, value: 'frog', emoji: '🐸' },
  { id: 19, value: 'snake', emoji: '🐍' },
  { id: 20, value: 'snake', emoji: '🐍' },
  { id: 21, value: 'ferret', emoji: '🦡' },
  { id: 22, value: 'ferret', emoji: '🦡' },
  { id: 23, value: 'parrot', emoji: '🦜' },
  { id: 24, value: 'parrot', emoji: '🦜' },
  { id: 25, value: 'mouse', emoji: '🐭' },
  { id: 26, value: 'mouse', emoji: '🐭' },
  { id: 27, value: 'goat', emoji: '🐐' },
  { id: 28, value: 'goat', emoji: '🐐' },
  { id: 29, value: 'cow', emoji: '🐄' },
  { id: 30, value: 'cow', emoji: '🐄' },
]

// Shuffle the cards
function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5)
}

// Generate HTML for the cards
function generateCardsHTML() {
  const shuffledCards = shuffleCards(cards)

  return shuffledCards
    .map(
      (card) => `
        <article class="card" data-pair-id="${card.id}" data-value="${card.value}">
          <div class="card__back">?</div>
          <div class="card__front">${card.emoji}</div>
        </article>
      `
    )
    .join('')
}

// Load the cards into the grid
function loadCards() {
  const grid = document.getElementById('grid')
  grid.innerHTML = generateCardsHTML()
}

// Call the function to load cards
loadCards()

// Game logic
