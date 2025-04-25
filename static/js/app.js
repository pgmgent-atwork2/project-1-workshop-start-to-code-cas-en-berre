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

  // Add event listeners to the cards
  const cardElements = grid.querySelectorAll('.card')
  cardElements.forEach((card) => {
    card.addEventListener('click', handleCardClick)
  })
}

// Game logic
let currentPlayer = 1
let playerScores = { 1: 0, 2: 0 }
let flippedCards = []

// Function to handle card click
function handleCardClick(event) {
  const card = event.target.closest('.card')

  if (!card || card.classList.contains('flipped') || flippedCards.length === 2)
    return

  card.classList.add('flipped')

  flippedCards.push({
    id: card.dataset.pairId,
    value: card.dataset.value,
    element: card,
  })

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards

    if (card1.value === card2.value) {
      // Match found
      playerScores[currentPlayer]++
      flippedCards = []
      updateScoreDisplay()
      checkGameOver()

    } else {
      // No match, flip cards back after a delay
      setTimeout(() => {
        card1.element.classList.remove('flipped')
        card2.element.classList.remove('flipped')
        flippedCards = []

        // Switch to the next player
        currentPlayer = currentPlayer === 1 ? 2 : 1
        updateScoreDisplay()
      }, 1000)
    }
  }
}

// Function to update the score display
function updateScoreDisplay() {
  const player1Score = document.getElementById('player1-points')
  const player2Score = document.getElementById('player2-points')
  const currentPlayerDisplay = document.getElementById('current-player')
  const player1Text = document.getElementById('player1-text')
  const player2Text = document.getElementById('player2-text')

  if (player1Score) player1Score.textContent = playerScores[1]
  if (player2Score) player2Score.textContent = playerScores[2]
  if (currentPlayerDisplay)
    currentPlayerDisplay.textContent = `Speler ${currentPlayer}`

  if (player1Text && player2Text) {
    if (currentPlayer === 1) {
      player1Text.classList.add('active')
      player2Text.classList.remove('active')
    }
    else {
      player1Text.classList.remove('active')
      player2Text.classList.add('active')
    }
  }
}

// Function to reset the game
function resetGame() {
  playerScores = { 1: 0, 2: 0 }
  currentPlayer = 1
  flippedCards = []
  updateScoreDisplay()
  loadCards()
}

// Add event listener to the reset button
const resetButton = document.getElementById('reset')
if (resetButton) {
  resetButton.addEventListener('click', resetGame)
}

// Function check if the game is over
function checkGameOver() {
    const totalPairs = cards.length / 2
    const matchedPairs = playerScores[1] + playerScores[2]
    if (matchedPairs === totalPairs) {
        displayEndScreen()
    }
}

// Function to display the end screen
function displayEndScreen() {
    const modal = document.getElementById('win')
    const gameEnd = document.getElementById('game-end')

    if (playerScores[1] > playerScores[2]) {
        gameEnd.textContent = `Speler 1 wint met ${playerScores[1]} punten!`
    } else {
        gameEnd.textContent = `Speler 2 wint met ${playerScores[2]} punten!`
    }

    modal.classList.remove('hidden')

    const playAgainButton = document.getElementById('again')
    playAgainButton.addEventListener('click', () => {
        modal.classList.add('hidden')
        resetGame()
    })
}
loadCards()
