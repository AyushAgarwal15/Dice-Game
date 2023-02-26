'use strict';

// *Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const rulesBtn = document.querySelector('.btn--rules');
const closeBtn = document.getElementById('close');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function () {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


// *Roll and display dice functionality

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDiceNumber}.png`;
    // *Check for rolled 1:
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      //* Add dice to the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //* Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // player won so finish the game now
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);

rulesBtn.addEventListener('click', function(){
    document.querySelector('.rules').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
})

closeBtn.addEventListener('click', function(){
    document.querySelector('.rules').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
})