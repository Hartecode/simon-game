'use strict';

const greenBtn = document.getElementById('green'),
    redBtn = document.getElementById('red'),
    yellowBtn = document.getElementById('yellow'),
    blueBtn = document.getElementById('blue'),
    powerBtn = document.getElementById('power'),
    scoreDisplay = document.getElementById('score'),
    btnColorPress = {
        'green': () => {
            greenBtn.classList.add('greenflash');
            setTimeout(() => {
                greenBtn.classList.remove('greenflash');
            }, 500);
        },
        'red': () => {
            redBtn.classList.add('redflash');
            setTimeout(() => {
                redBtn.classList.remove('redflash');
            }, 500);
        },
        'blue': () => {
            blueBtn.classList.add('blueflash');
            setTimeout(() => {
                blueBtn.classList.remove('blueflash');
            }, 500);
        },
        'yellow': () => {
            yellowBtn.classList.add('yellowflash');
            setTimeout(() => {
                yellowBtn.classList.remove('yellowflash');
            }, 500);
        }
    }
//the players moves
let userMoves = [];
//the current players move
let playerMov = 0;
//the computer moves
let compMoves = [];
//this indicates if a game is running.
//the initital value is false indicating there is no game running
let gameStatus = false
//the starting score
let userScore = 0;


//power button listener
powerBtn.addEventListener('click', () => {
  gameStatus = !gameStatus;
  if (gameStatus) {
    scoreDisplay.textContent = userScore;
    greenBtn.classList.add('green');
    redBtn.classList.add('red');
    yellowBtn.classList.add('yellow');
    blueBtn.classList.add('blue');
    runGame();
  } else {
    compMoves = [];
    scoreDisplay.textContent = '';
    greenBtn.className = '';
    redBtn.className = '';
    yellowBtn.className = '';
    blueBtn.className = '';
  }
});

//runGame color
function runGame() {
  compMoves = [...compMoves, randomColor()]; 
  console.log(compMoves);
  for (let i = 0; i < compMoves.length; i++) {
    setTimeout( () => {
      btnColorPress[compMoves[i]]();
    }, 1000 + (i * 1000));
  }
}

//this checks if the answer is correct
function checkAnswer(color) {
  userMoves = [...userMoves, color];
  if (userMoves[userMoves.length -1] === compMoves[playerMov]) {
    playerMov++;
    console.log(playerMov);
    if(playerMov === compMoves.length) {
      playerMov = 0;
      userScore += 1;
      scoreDisplay.textContent = userScore;
      userMoves = []
      runGame()
    }
  } else {
    gameStatus = !gameStatus;
    alert(`Game over! Top score: ${userScore}`);
    userScore = 0;
    playerMov = 0;
    compMoves = [];
    userMoves = [];
    console.log('game over');
  }
}

//green button clcik listener
greenBtn.addEventListener('click', () => {
  if (gameStatus) {
    checkAnswer('green');
  }
});

//red button click listner
redBtn.addEventListener('click', () => {
  if (gameStatus) {
    checkAnswer('red');
  }
});

//yellow button click listener
yellowBtn.addEventListener('click', () => {
  if (gameStatus) {
    checkAnswer('yellow');
  }
});

//red button click listner
blueBtn.addEventListener('click', () => {
  if (gameStatus) {
    checkAnswer('blue');
  }
});

///returns one out of three differentr colors
function randomColor() {
  const boardColors = ['green', 'red', 'yellow', 'blue'];
  return boardColors[Math.floor(Math.random() * 4)];
}