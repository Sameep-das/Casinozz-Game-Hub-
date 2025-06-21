const onTouch = new Audio('../resources/onTouch.mp3');
const onReset = new Audio('../resources/welcome.mp3')
let tossResult = document.querySelector('.toss-result');
let outputIcon = document.querySelector('.js-output-icon');
let headInput = document.querySelector('.js-head-input');
let tailInput = document.querySelector('.js-tail-input');

let score = JSON.parse(localStorage.getItem('ftpScore'));
if (!score) {
  score = {
    wins: 0
  };
}

document.querySelector('.score').innerText = score.wins;

function compChoice() {
  let randomNo = Math.random();
  return randomNo;
}

function defineToss(value) {
  if (value >= 0 && value <= 0.5) {
    return "Head";
  }
  else if (value >= 0.6 && value <= 1) {
    return "Tail";
  }
}

function evaluateResult(userChoice) {
  let computerMove = defineToss(compChoice());
  if(computerMove === 'Head'){
    outputIcon.classList.remove('tail-icon');
    outputIcon.classList.add('head-icon');
  } else{
    outputIcon.classList.remove('head-icon');
    outputIcon.classList.add('tail-icon');
  }
  tossResult.classList.remove('emote-disabled');
  if (computerMove === userChoice) {
    tossResult.classList.add('green-result');
    tossResult.innerText = "Victory";
    setTimeout(() => {
      document.querySelector('.victory-popup').classList.remove('show-popup');
      }, 700);
    document.querySelector('.victory-popup').classList.add('show-popup');
    
    
    score.wins += 1;
  }
  else {
    tossResult.classList.remove('green-result');
    tossResult.innerText = "Defeat";
    setTimeout(() => {
      document.querySelector('.defeat-popup').classList.remove('show-popup');
      }, 700);
    document.querySelector('.defeat-popup').classList.add('show-popup');
    if (score.wins > 0) {
      score.wins -= 1;
    }
  }
  localStorage.setItem('ftpScore', JSON.stringify(score));
  document.querySelector('.score').innerText = score.wins;
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
  headInput.style.removeProperty('opacity', '0.7');
  tailInput.style.removeProperty('opacity', '0.7');
  headInput.classList.remove('choice-select');
  tailInput.classList.remove('choice-select');
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
  tossResult.classList.add('emote-disabled');
  outputIcon.classList.remove('head-icon');
  outputIcon.classList.remove('tail-icon');
  document.querySelector('.score').innerText = score.wins;
}

document.querySelector('.reset-btn')
  .addEventListener('click',
    () => {
      handleReset();
    });

document.querySelector('.js-auto-play')
  .addEventListener('click',
    () => {
      handleAutoPlay();
    });


let isAutoPlay = false;
let intervalID;
function handleAutoPlay(){
  if(!isAutoPlay){
    document.querySelector('.js-auto-play').innerText = 'Pause Play';
    intervalID = setInterval(() => {
      let compAsUserMove = defineToss(compChoice());
      if(compAsUserMove === 'Head'){
        tailInput.style.setProperty('opacity', '0.7');
        headInput.style.removeProperty('opacity', '0.7');
        tailInput.classList.remove('choice-select');
        headInput.classList.add('choice-select');
        onTouch.play();
      }
      else if(compAsUserMove === 'Tail'){
        headInput.style.setProperty('opacity', '0.7');
        tailInput.style.removeProperty('opacity', '0.7');
        headInput.classList.remove('choice-select');
        tailInput.classList.add('choice-select');
        onTouch.play();
      }
      evaluateResult(compAsUserMove);
    }, 2000);
    isAutoPlay = true;
  }
  else{
    removeFeatures();
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}