const gameboardObj = (function () {
  "use strict";

  const module = {};

  const board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  const validPositionCheck = (row = 0, col = 0) => {
    const validRow = row >= 0 && row < 3;
    const validCol = col >= 0 && col < 3;
    if (!validRow || !validCol) {
      throw new Error("Invalid position.");
    }
  }

  module.reset = () => {
    board[0] = ["_", "_", "_"];
    board[1] = ["_", "_", "_"];
    board[2] = ["_", "_", "_"];
  };

  module.placeMarker = (row, col, marker) => {
    validPositionCheck(row, col);
    if (board[row][col] !== "_") {
      throw new Error("A marker already exists in this row, col position.");
    }

    board[row][col] = marker;
  };

  module.inLeftDiag = (row, col) => {
    validPositionCheck(row, col);
    const coordStr = `${row} ${col}`;
    return ["0 0", "1 1", "2 2"].includes(coordStr);
  };

  module.inRightDiag = (row, col) => {
    validPositionCheck(row, col);
    const coordStr = `${row} ${col}`;
    return ["0 2", "1 1", "2 0"].includes(coordStr);
  };

  module.getRow = (row) => {
    validPositionCheck(row, 0);
    return [...board[row]];
  };

  module.getCol = (col) => {
    validPositionCheck(0, col);
    return board.map((row) => row[col]);
  };

  module.getLeftDiag = () => {
    return board.map((row, i) => row[i]);
  };

  module.getRightDiag = () => {
    const rowLength = board[0].length;
    return board.map((row, i) => row[rowLength - (i + 1)]);
  };

  return module;
})();