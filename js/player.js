const createPlayer = (name, marker) => {
  "use strict";

  let score = 0;

  const getScore = () => score;
  const win = () => score++;
  const reset = () => (score = 0);

  return { name, marker, getScore, win, reset };
};