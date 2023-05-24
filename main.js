const displayController = (() => {
  const displayMessage = (message) => {
    document.querySelector('#message').innerHTML = message;
  }
  return { displayMessage }
})();

const Gameboard = (() => {
  let gameboard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const display = () => {
    let htmlBoard = "";
    gameboard.forEach((square, index) => {
      htmlBoard += `<div class="square" id="square${index}">${square}</div>`
    })

    document.querySelector('#gameboard').innerHTML = htmlBoard;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick)
    })
  }

  const update = (index, value) => {
    gameboard[index] = value;
    display();
  }

  const getGameboard = () => gameboard;

  return { display, update, getGameboard };
})();

const createPlayer = (name, marker) => {
  return { name, marker }
}

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#palyer1').value, "X"),
      createPlayer(document.querySelector('#player2').value, "O")
    ]
    currentPlayer = 0;
    gameOver = false;
    Gameboard.display();
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', handleClick)
    })
  }

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split('e')[1]);

    if (Gameboard.getGameboard()[index] !== "") {
      return;
    }

    Gameboard.update(index, players[currentPlayer].marker)

    if (checkForWin(Gameboard.getGameboard(), players[currentPlayer].marker)) {
      gameOver = true;
      displayController.displayMessage(`${players[currentPlayer].name} wins`);
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.displayMessage("It's a tie!");
    }

    currentPlayer = currentPlayer === 0 ? 1 : 0;
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    Gameboard.display();
    displayController.displayMessage('');
  }

  return { start, handleClick, restart }
})();

function checkForWin(board) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every(cell => cell !== "")
}

const btnRestart = document.querySelector('#btnRestart');
btnRestart.addEventListener('click', function () {
  Game.restart();
  Game.start();
})

const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', function () {
  const gameboardEl = document.querySelector('#gameboard');
  gameboardEl.classList.add('active');
  Game.start();
})