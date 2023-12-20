const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const valA = gameState[a];
    const valB = gameState[b];
    const valC = gameState[c];
    if (valA === '' || valB === '' || valC === '') {
      continue;
    }
    if (valA === valB && valB === valC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.innerHTML = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.innerHTML = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function handleRestartGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.innerHTML = 'Player X\'s Turn';
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestartGame);

// Inside handleCellClick function

  
// Inside handleResultValidation function

function handleResultValidation() {
  let roundWon = false;
  let winningCombo;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const valA = gameState[a];
    const valB = gameState[b];
    const valC = gameState[c];

    if (valA === '' || valB === '' || valC === '') {
      continue;
    }

    if (valA === valB && valB === valC) {
      roundWon = true;
      winningCombo = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    highlightWinningCombo(winningCombo);
    status.innerHTML = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.innerHTML = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function highlightWinningCombo(combo) {
  combo.forEach(index => {
    const cell = document.querySelector(`[data-cell="${index}"]`);
    cell.style.backgroundColor = currentPlayer === 'X' ? 'white' : 'white';
  });
}


function highlightWinningCombo(combo) {
  combo.forEach(index => {
    const cell = document.querySelector(`[data-cell="${index}"]`);
    cell.classList.add('winning-cell');
  });
}


function handleRestartGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.innerHTML = 'Player X\'s Turn';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerHTML = '';
    cell.style.backgroundColor = ''; // Reset background color
    cell.classList.remove('winning-cell'); // Remove winning-cell class
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const textAnimation = document.querySelector('.animate-text');
  textAnimation.style.opacity = '1'; // Ensure the text is visible before starting the animation
  textAnimation.style.animation = 'none'; // Disable the existing animation

  setTimeout(function () {
    textAnimation.style.animation = 'fadeIn 1.5s ease-in-out forwards'; // Apply the animation after a delay
  }, 500); // Adjust the delay (in milliseconds) to your preference
});

 
  //bitmoji
  function handleResultValidation() {
    let roundWon = false;
    let winningCombo;
  
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      const valA = gameState[a];
      const valB = gameState[b];
      const valC = gameState[c];
  
      if (valA === '' || valB === '' || valC === '') {
        continue;
      }
  
      if (valA === valB && valB === valC) {
        roundWon = true;
        winningCombo = [a, b, c];
        break;
      }
    }
  
    if (roundWon) {
      highlightWinningCombo(winningCombo);
      if (currentPlayer === 'X') {
        status.innerHTML = 'Player X has won!';
        animateWinningImage('.boy-img', 'left');
      } else {
        status.innerHTML = 'Player O has won!';
        animateWinningImage('.other-img', 'right');
      }
      gameActive = false;
      return;
    }
  
    if (!gameState.includes('')) {
      status.innerHTML = 'It\'s a tie!';
      gameActive = false;
      return;
    }
  
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerHTML = `Player ${currentPlayer}'s Turn`;
  }

  


  //won
  function animateWinningImage(selector, direction) {
    const img = document.querySelector(selector);
    img.style.display = 'block';
    let pos = direction === 'left' ? -110 : window.innerWidth + 110;
    const id = setInterval(frame, 5);
  
    function frame() {
      if ((direction === 'left' && pos >= window.innerWidth) ||
          (direction === 'right' && pos <= -110)) {
        clearInterval(id);
        img.style.display = 'none';
      } else {
        pos += direction === 'left' ? 1 : -1;
        img.style[direction] = pos + 'px';
      }
    }
  }



  
  
  