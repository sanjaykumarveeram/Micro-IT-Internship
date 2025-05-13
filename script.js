const board = document.getElementById("game-board");
const message = document.getElementById("message");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");
let scores = { X: 0, O: 0, Draw: 0 };

// Create the 9 cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScores();
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    message.textContent = "It's a Draw!";
    scores.Draw++;
    updateScores();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(([a, b, c]) => {
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.Draw;
}

function resetGame() {
  gameState.fill("");
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s Turn`;
}
