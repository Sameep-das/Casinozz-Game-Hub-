import {getElementByClass, removeClass, addClass, removePropByClass, addClassByID, removeClassByID, changeText, setPropByClass} from './utils/dom_manipulation.js';

const onReset = new Audio('../resources/welcome.mp3');
const onTouch = new Audio('../resources/welcome.mp3');

let headInput = getElementByClass('js-head-input');
let tailInput = getElementByClass('js-tail-input');

let score = JSON.parse(localStorage.getItem('ftpScore'));
if (!score) {
  score = {
    wins: 0
  };
}

changeText('score', score.wins);

function compChoice() {
  let randomNo = Math.random();
  return randomNo;
}

function defineToss(value) {
  if (value >= 0 && value <= 0.5) {
    return "Head";
  }
  else if (value > 0.5 && value <= 1) {
    return "Tail";
  }
}

function evaluateResult(userChoice) {
  let computerMove = defineToss(compChoice());
  if(computerMove === 'Head'){
    removeClass('js-output-icon', 'tail-icon');
    addClass('js-output-icon', 'head-icon');
  } else{
    removeClass('js-output-icon', 'head-icon');
    addClass('js-output-icon', 'tail-icon');
  }
  
  removeClass('toss-result', 'emote-disabled');
  if (computerMove === userChoice) {
    addClass('toss-result', 'green-result');
    changeText('toss-result', 'Victory!');
    setTimeout(() => {
      removeClass('victory-popup', 'show-popup');
      }, 700);
    addClass('victory-popup', 'show-popup');
    score.wins += 1;
  }
  else {
    removeClass('toss-result', 'green-result');
    changeText('toss-result', 'Oops! Defeat');
    setTimeout(() => {
        removeClass('defeat-popup', 'show-popup');
      }, 700);
    addClass('defeat-popup', 'show-popup');
    if (score.wins > 0) {
      score.wins -= 1;
    }
  }
  localStorage.setItem('ftpScore', JSON.stringify(score));
  changeText('score', score.wins);
}

tailInput
  .addEventListener('click',
    () => {
      evaluateResult("Tail");
      onTouch.play();
    });

headInput
  .addEventListener('click',
    () => {
      evaluateResult("Head");
      onTouch.play();
    });

function removeFeatures(){
  removePropByClass('js-head-input', 'opacity');
  removePropByClass('js-tail-input', 'opacity');
  removeClass('js-head-input', 'choice-select');
  removeClass('js-tail-input', 'choice-select');
}

function handleReset() {
  onReset.play();
  removeFeatures();
  localStorage.removeItem('ftpScore');
  score = JSON.parse(localStorage.getItem('ftpScore'));
  if (score === null) {
    score = {
      wins: 0
    };
  }
  
  addClass('toss-result', 'emote-disabled');
  removeClass('js-output-icon', 'head-icon');
  removeClass('js-output-icon', 'tail-icon');
  changeText('score', score.wins);
}

let resetBtn = getElementByClass('reset-btn');
resetBtn
  .addEventListener('click',
    () => {
      handleReset();
    });

let autoPlayBtn = getElementByClass('js-auto-play');
autoPlayBtn
  .addEventListener('click',
    () => {
      handleAutoPlay();
    });


let isAutoPlay = false;
let intervalID;
function handleAutoPlay(){
  if(!isAutoPlay){
    changeText('js-auto-play', 'Pause Play');
    intervalID = setInterval(() => {
      let compAsUserMove = defineToss(compChoice());
      if(compAsUserMove === 'Head'){
        setPropByClass('js-tail-input', 'opacity', '0.7');
        removePropByClass('js-head-input','opacity');
        removeClass('js-tail-input', 'choice-select');
        addClass('js-head-input', 'choice-select');
        onTouch.play();
      }
      else if(compAsUserMove === 'Tail'){
        setPropByClass('js-head-input', 'opacity', '0.7');
        removePropByClass('js-tail-input','opacity');
        removeClass('js-head-input', 'choice-select');
        addClass('js-tail-input', 'choice-select');
        onTouch.play();
      }
      evaluateResult(compAsUserMove);
    }, 2000);
    isAutoPlay = true;
  }
  else{
    removeFeatures();
    changeText('js-auto-play', 'Auto Play');
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}