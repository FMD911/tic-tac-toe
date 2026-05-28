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

console.log(Gameboard.getBoard());

