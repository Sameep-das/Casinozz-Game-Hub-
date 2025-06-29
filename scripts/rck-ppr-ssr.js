import {getElementByClass, removeClass, addClass, setPropByClass, changeText} from './utils/dom_manipulation.js';

const onReset = new Audio('../resources/welcome.mp3');
const onTouch = new Audio('../resources/welcome.mp3');

let score = JSON.parse(localStorage.getItem('rpsScore'));
if(!score){
  score = {
    wins : 0,
    losses : 0,
    ties : 0
  };
}
changeText('score',score.wins);
changeText('js-score', `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`);

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
    else if(event.key === ' '){
      handleAutoPlay();
    }
  });

let resetBtn = getElementByClass('reset-btn');
resetBtn
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
  changeText('js-score', `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`);

  // document.querySelector('.js-userChoice').classList.add('emote-disabled');
  addClass('js-userChoice', 'emote-disabled');
  // document.querySelector('.js-compChoice').classList.add('emote-disabled');
  addClass('js-compChoice', 'emote-disabled');
  // document.querySelector('.js-result').classList.add('emote-disabled');
  addClass('js-result', 'emote-disabled');
  changeText('score', score.wins);
  // document.querySelector('.js-auto-play').innerText = 'Auto Play';
  changeText('js-auto-play', 'Auto Play');
  clearInterval(autoPlayID);
  isAutoPlay = false;
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

  let userIcon = getElementByClass('js-userChoice');
  let compIcon = getElementByClass('js-compChoice');

  if(compChoice == 'scissors') {
    // compIcon.style.setProperty('background', `url(../resources/${compChoice}.svg)`);
    setPropByClass('js-compChoice', 'background', `url(../resources/scissors.svg) no-repeat`);
    // compIcon.style.setProperty('background-size', '60% 60%');
    setPropByClass('js-compChoice', 'background-size', '60% 60%');
    // compIcon.style.setProperty('background-position', 'center');
    setPropByClass('js-compChoice', 'background-position', 'center');
  }
  else {
    // compIcon.style.setProperty('background', `url(../resources/${compChoice}.png)`);
    setPropByClass('js-compChoice', 'background', `url(../resources/${compChoice}.png) no-repeat`);
    // compIcon.style.setProperty('background-size', '60% 60%');
    setPropByClass('js-compChoice', 'background-size', '60% 60%');
    // compIcon.style.setProperty('background-position', 'center');
    setPropByClass('js-compChoice', 'background-position', 'center');
  }

  if(userChoice == 'scissors') {
    // userIcon.style.setProperty('background', `url(../resources/${userChoice}.svg)`);
    setPropByClass('js-userChoice', 'background', `url(../resources/scissors.svg) no-repeat`)
    // compIcon.style.setProperty('background-size', '60% 60%');
    setPropByClass('js-userChoice', 'background-size', '60% 60%');
    // compIcon.style.setProperty('background-position', 'center');
    setPropByClass('js-userChoice', 'background-position', 'center');
  }
  else {
    // userIcon.style.setProperty('background', `url(../resources/${userChoice}.png)`);
    setPropByClass('js-userChoice', 'background', `url(../resources/${userChoice}.png) no-repeat`)
    // compIcon.style.setProperty('background-size', '60% 60%');
    setPropByClass('js-userChoice', 'background-size', '60% 60%');
    // compIcon.style.setProperty('background-position', 'center');
    setPropByClass('js-userChoice', 'background-position', 'center');
  }
  
  
  return result;
}

function computeScore(result){
  removeClass('js-compChoice','emote-disabled');
  removeClass('js-userChoice', 'emote-disabled');
  removeClass('js-result', 'emote-disabled');

  if(result === 1){
    score.wins += 1;
    removeClass('js-result', 'white-result');
    addClass('js-result', 'green-result');
    changeText('js-result', 'Victory!');
  }
  else if(result === 0.5){
    score.ties += 1;
    removeClass('js-result', 'green-result');
    addClass('js-result', 'white-result');
    changeText('js-result','Game Tie');
  }
  else{
    score.losses += 1;
    removeClass('js-result', 'white-result');
    removeClass('js-result', 'green-result');
    changeText('js-result', 'Oops! Defeat');
  }

  localStorage.setItem('rpsScore', JSON.stringify(score));
  changeText('score', score.wins);
  changeText('js-score', `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`);
}


let autoPlayID;
let isAutoPlay = false;
let autoPlayBtn = getElementByClass('js-auto-play');
autoPlayBtn
  .addEventListener('click', () => {
    handleAutoPlay();
  });

function handleAutoPlay(){
  if(!isAutoPlay){
    changeText('js-auto-play', 'Pause Play');
    autoPlayID = setInterval(function(){
      computeScore(computeResult(compChoiceGenerator()));
      onTouch.play();
    }, 1800);
    isAutoPlay = true;
  }
  else {
    changeText('js-auto-play', 'Auto Play');
    clearInterval(autoPlayID);
    isAutoPlay = false;
  }
}

