const Gameboard = (() => {
  const board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => board;

  const placeMark = (index, mark) => {
    board[index] = mark;
  };

  return {
    getBoard,
    placeMark
  };
})();

function Player(name, marker) {
  return {
    name,
    marker
  };
}

const GameController = (() => {
  const playerX = Player("Player 1", "X");
  const playerO = Player("Player 2", "O");

  let currentPlayer = playerX;

  function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function playTurn(index) {
    Gameboard.placeMark(index, currentPlayer.marker);
    switchPlayer();
  }

  return {
    playTurn,
    getCurrentPlayer
  };
})();

