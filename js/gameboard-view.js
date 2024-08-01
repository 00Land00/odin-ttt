const gameboardView = (function() {
  "use strict";

  const module = {};

  const form = document.querySelector(".player-form");
  const formSection = document.querySelector(".form-section");
  const gameSection = document.querySelector(".game-section");

  const formEH = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const player1 = createPlayer(formValues.player1, "O");
    const player2 = createPlayer(formValues.player2, "X");

    gameboardController.beginGame(player1, player2);
    formSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
  };

  const title = document.querySelector(".title");
  const player1Title = document.querySelector(".player1");
  const scoreTitle = document.querySelector(".score");
  const player2Title = document.querySelector(".player2");

  const gameboard = document.querySelector(".gameboard");

  module.resetView = (player1, player2) => {
    title.innerHTML = `IT'S ${player1.name.toUpperCase()}'S TURN!`;
    player1Title.innerHTML = `${player1.name.toUpperCase()}`;
    player2Title.innerHTML = `${player2.name.toUpperCase()}`;
    scoreTitle.innerHTTML = `${player1.getScore()} - ${player2.getScore()}`;

    for(const cell of gameboard.children) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      cell.innerHTML = ``;
      
      const newCell = document.createElement("div");
      newCell.classList.add("cell");
      newCell.addEventListener("click", () => {
        gameboardController.playTurn(row, col);
      });

      cell.appendChild(newCell);
    }
  };

  module.updateTitle = (titleStr) => {
    const title = document.querySelector(".title");

    title.innerHTML = titleStr;
  };

  module.updateScore = (score1, score2) => {
    scoreTitle.innerHTML = `${score1} - ${score2}`;
  }

  module.addMarker = (row, col, curTurn) => {
    const cell = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
    const marker = document.createElement("img");
    if (curTurn % 2 === 0) {
      marker.src = "circle-outline.svg";
      marker.alt = "circle";
    } else {
      marker.src = "close.svg";
      marker.alt = "cross";
    }

    cell.innerHTML = ``;
    cell.appendChild(marker);
  };

  const restartSection = document.querySelector(".restart-section");

  const restartEH = () => {
    gameboardController.restartGame();
    restartSection.classList.add("hidden");
  };

  module.restartView = () => {
    restartSection.classList.remove("hidden");
  };

  window.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", formEH);

    restartSection.addEventListener("click", restartEH);
  });

  return module;
})();

/*
- implement the view logic
*/