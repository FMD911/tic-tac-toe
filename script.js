const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMark = (index, mark) => {
    board[index] = mark;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return {
    getBoard,
    placeMark,
    resetBoard
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
  let gameOver = false;

  const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function checkWin(board) {
    return winCombos.some(combo => {
      return combo.every(index => board[index] === currentPlayer.marker);
    });
  }

  function checkDraw(board) {
    return board.every(cell => cell !== "");
  }

  function playTurn(index) {
    if (gameOver) return;

    Gameboard.placeMark(index, currentPlayer.marker);

    const board = Gameboard.getBoard();

    if (checkWin(board)) {
      gameOver = true;
      DisplayController.showMessage(`${currentPlayer.name} wins! 🎉`);
      return;
    }

    if (checkDraw(board)) {
      gameOver = true;
      DisplayController.showMessage("It's a draw! 🤝");
      return;
    }

    switchPlayer();
  }

  function resetGame() {
    Gameboard.resetBoard();
    currentPlayer = playerX;
    gameOver = false;
  }

  return {
    playTurn,
    getCurrentPlayer,
    resetGame
  };
})();

const DisplayController = (() => {
  const boardContainer = document.getElementById("library");
  const messageContainer = document.createElement("div");

  messageContainer.classList.add("message");
  document.body.insertBefore(messageContainer, boardContainer);

  function showMessage(text) {
    messageContainer.textContent = text;
  }

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

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Game";
    resetBtn.classList.add("reset");

    resetBtn.addEventListener("click", () => {
      GameController.resetGame();
      showMessage("");
      render();
    });

    boardContainer.appendChild(resetBtn);
  }

  return {
    render,
    showMessage
  };
})();

DisplayController.render();