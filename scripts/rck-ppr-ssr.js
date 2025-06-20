
const onTouch = new Audio('../resources/onTouch.mp3');
const onReset = new Audio('../resources/welcome.mp3');
let score = JSON.parse(localStorage.getItem('rpsScore'));
if(!score){
  score = {
    wins : 0,
    losses : 0,
    ties : 0
  };
}
document.querySelector('.score').innerHTML = score.wins;
document.querySelector('.js-score').innerText = `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`;

const choiceIconArr = document.querySelectorAll('.js-choice-icon');
choiceIconArr.forEach((value, index) => {
  choiceIconArr[index].addEventListener('click', () => {
    let userChoice = choiceIconArr[index].id;
    computeScore(computeResult(userChoice));
    onTouch.play();
  })
});

document.body
  .addEventListener('keydown', (event) => {
    if(event.key === 'R' || event.key === 'r') {
      computeScore(computeResult('rock'));
      onTouch.play();
    }
    else if(event.key === 'P' || event.key === 'p'){
      computeScore(computeResult('paper'));
      onTouch.play();
    }
    else if(event.key === 'S' || event.key === 's'){
      computeScore(computeResult('scissors'));
      onTouch.play();
    }
  });

document.querySelector('.reset-btn')
  .addEventListener('click', () => {
    handleReset();
    onReset.play();
  });

function handleReset()
{
  localStorage.removeItem('rpsScore');
  score = JSON.parse(localStorage.getItem('rpsScore'));
  if(score === null){
    score = {
      wins : 0,
      losses : 0,
      ties : 0
    };
  }
  document.querySelector('.js-score').innerText = `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`;

  document.querySelector('.js-userChoice').classList.add('emote-disabled');
  document.querySelector('.js-compChoice').classList.add('emote-disabled');
  document.querySelector('.js-result').classList.add('emote-disabled');
  document.querySelector('.score').innerHTML = score.wins;
}

let compChoice;

function compChoiceGenerator(){
  let randomNo = Math.random();
  if(randomNo >= 0 && randomNo < 1/3) return 'rock';
  else if(randomNo >= 1/3 && randomNo < 2/3) return 'paper';
  else return 'scissors';
}

function computeResult(userChoice){
  compChoice = compChoiceGenerator();
  let result = 0;
  if(userChoice === 'rock'){
    if(compChoice === 'scissors') result = 1;
    else if(compChoice === 'rock') result = 0.5;
  }
  else if(userChoice === 'paper'){
    if(compChoice === 'rock') result = 1;
    else if(compChoice === 'paper') result = 0.5;
  }
  else{
    if(compChoice === 'paper') result = 1;
    else if(compChoice === 'scissors') result = 0.5;
  }

  let userIcon = document.querySelector('.js-userChoice');
  let compIcon = document.querySelector('.js-compChoice');

  if(compChoice == 'scissors') {
    compIcon.style.setProperty('background', `url(../resources/${compChoice}.svg)`);
    compIcon.style.setProperty('background-size', '60% 60%');
    compIcon.style.setProperty('background-position', 'center');
    compIcon.style.setProperty('background-repeat', 'no-repeat');
  }
  else {
    compIcon.style.setProperty('background', `url(../resources/${compChoice}.png)`);
    compIcon.style.setProperty('background-size', '60% 60%');
    compIcon.style.setProperty('background-position', 'center');
    compIcon.style.setProperty('background-repeat', 'no-repeat');
  }

  if(userChoice == 'scissors') {
    userIcon.style.setProperty('background', `url(../resources/${userChoice}.svg)`);
    userIcon.style.setProperty('background-size', '60% 60%');
    userIcon.style.setProperty('background-position', 'center');
    userIcon.style.setProperty('background-repeat', 'no-repeat');
  }
  else {
    userIcon.style.setProperty('background', `url(../resources/${userChoice}.png)`);
    userIcon.style.setProperty('background-size', '60% 60%');
    userIcon.style.setProperty('background-position', 'center');
    userIcon.style.setProperty('background-repeat', 'no-repeat');
  }
  
  
  return result;
}

let gameResult = document.querySelector('.js-result');

function computeScore(result){
  document.querySelector('.js-userChoice').classList.remove('emote-disabled');
  document.querySelector('.js-compChoice').classList.remove('emote-disabled');
  document.querySelector('.js-result').classList.remove('emote-disabled');

  if(result === 1){
    score.wins += 1;
    gameResult.style.setProperty('color', '#adff2f');
    gameResult.innerText = 'Victory!';
  }
  else if(result === 0.5){
    score.ties += 1;
    gameResult.style.setProperty('color', '#ffffff');
    gameResult.innerText = 'Game Tie';
  }
  else{
    score.losses += 1;
    gameResult.style.setProperty('color', '#F01B1B');
    document.querySelector('.js-result').innerText = 'Oops! Defeat';
  }

  localStorage.setItem('rpsScore', JSON.stringify(score));
  document.querySelector('.score').innerText = score.wins;
  document.querySelector('.js-score').innerText = `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`;
}


let autoPlayID;
let isAutoPlay = false;

document.querySelector('.js-auto-play')
  .addEventListener('click', () => {
    handleAutoPlay();
  });

function handleAutoPlay(){
  if(!isAutoPlay){
    document.querySelector('.js-auto-play').innerText = 'Pause Play';
    autoPlayID = setInterval(function(){
      computeScore(computeResult(compChoiceGenerator()));
      onTouch.play();
    }, 1800);
    isAutoPlay = true;
  }
  else {
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
    clearInterval(autoPlayID);
    isAutoPlay = false;
  }
}

