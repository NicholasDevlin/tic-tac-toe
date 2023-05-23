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
    console.log(squares);
  }
  return { display };
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
  }
  return { start }
})();

const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', function () {
  const gameboardEl = document.querySelector('#gameboard');
  gameboardEl.classList.add('active');
  Game.start();
})