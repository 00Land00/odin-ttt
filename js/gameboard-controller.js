const gameboardController = (function () {
  "use strict";

  const module = {};

  let players = [];
  let curPlayer = null;
  let curTurn = 0;

  const switchTurns = () => {
    curPlayer = curPlayer === players[0] ? players[1] : players[0];
    gameboardView.updateTitle(`IT'S ${curPlayer.name.toUpperCase()}'S TURN!`);
  };

  const threeInARow = (arr) => {
    return arr[0] === arr[1] && arr[1] === arr[2] && arr[2] !== "_";
  };

  const resetGame = () => {
    gameboardObj.reset();

    curPlayer = players[0];
    curTurn = 0;
  };

  const endGame = () => {
    curPlayer.win();
    gameboardView.updateTitle(`${curPlayer.name.toUpperCase()} WON!`);
    gameboardView.updateScore(players[0].getScore(), players[1].getScore());
    gameboardView.restartView();
  };

  const checkDrawCondition = () => {
    curTurn++;
    if (curTurn >= 9) {
      gameboardView.updateTitle(`IT'S A DRAW!`);
      gameboardView.restartView();

      return true;
    }
    return false;
  };

  const checkWinCondition = (row, col) => {
    let winFlag = false;

    if (
      threeInARow(gameboardObj.getRow(row)) ||
      threeInARow(gameboardObj.getCol(col))
    ) {
      endGame();
      winFlag = true;
    }

    if (
      gameboardObj.inLeftDiag(row, col) &&
      threeInARow(gameboardObj.getLeftDiag())
    ) {
      endGame();
      winFlag = true;
    }

    if (
      gameboardObj.inRightDiag(row, col) &&
      threeInARow(gameboardObj.getRightDiag())
    ) {
      endGame();
      winFlag = true;
    }

    return winFlag;
  };

  module.beginGame = (player1, player2) => {
    players = [player1, player2];
    resetGame();
    gameboardView.resetView(player1, player2);
  };

  module.playTurn = (row, col) => {
    try {
      if (curPlayer === null) {
        throw new Error(
          "To start a new game, call gameboardController.begin(<player1>, <player2>)"
        );
      }

      gameboardObj.placeMarker(row, col, curPlayer.marker);
      gameboardView.addMarker(row, col, curTurn);
      if (!checkWinCondition(row, col)) {
        checkDrawCondition() ? `` : switchTurns();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  module.restartGame = () => {
    module.beginGame(players[0], players[1]);
  };

  return module;
})();