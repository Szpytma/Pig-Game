'use strict';
// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let isPlaying;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Roling dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //Generating a random dice roll
    const dice = Math.round(Math.random() * (6 - 1) + 1);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    console.log(diceEl.src);
    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button functionality

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // Add current score to active player's
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if players scores is >=100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      isPlaying = false;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
// New game functionality
btnNew.addEventListener('click', init);
