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

const DisplayController = (() => {
  const boardContainer = document.getElementById("library");

  function render() {
    boardContainer.innerHTML = "";

    Gameboard.getBoard().forEach((cell, index) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.textContent = cell;

      cellButton.addEventListener("click", () => {
        if (cell !== "") return;

        GameController.playTurn(index);
        render();
      });

      boardContainer.appendChild(cellButton);
    });
  }

  return {
    render
  };
})();

DisplayController.render();

