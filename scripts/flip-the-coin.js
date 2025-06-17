const onTouch = new Audio('../resources/onTouch.mp3');
let score = JSON.parse(localStorage.getItem('ftpScore'));
if (!score) {
  score = {
    wins: 0
  };
}

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
    document.querySelector('.js-output-icon').classList.remove('tail-icon');
    document.querySelector('.js-output-icon').classList.add('head-icon');
  } else if(computerMove === 'Tail') {
    document.querySelector('.js-output-icon').classList.add('tail-icon');
  }
  document.querySelector('.toss-result').classList.remove('emote-disabled');
  if (computerMove === userChoice) {
    document.querySelector('.toss-result').innerText = "Victory";
    setTimeout(() => {
      // alert("Hello");
      document.querySelector('.victory-popup').classList.remove('show-popup');
      }, 700);
    document.querySelector('.victory-popup').classList.add('show-popup');
    
    
    score.wins += 1;
  }
  else {
    document.querySelector('.toss-result').innerText = "Defeat";
    setTimeout(() => {
      document.querySelector('.defeat-popup').classList.remove('show-popup');
      console.log("hi")
      }, 700);
    document.querySelector('.defeat-popup').classList.add('show-popup');
    if (score.wins > 0) {
      score.wins -= 1;
    }
  }
  localStorage.setItem('ftpScore', JSON.stringify(score));
  document.querySelector('.score').innerText = score.wins;
}

document.querySelector('.ftp-tail')
  .addEventListener('click',
    () => {
      evaluateResult("Tail");
      onTouch.play();
    });

document.querySelector('.ftp-head')
  .addEventListener('click',
    () => {
      evaluateResult("Head");
      onTouch.play();
    });

function handleReset() {
  document.querySelector('.js-head-input').style.removeProperty('opacity', '0.7');
  document.querySelector('.js-tail-input').style.removeProperty('opacity', '0.7');
  document.querySelector('.js-head-input').classList.remove('choice-select');
  document.querySelector('.js-tail-input').classList.remove('choice-select');
  localStorage.removeItem('ftpScore');
  score = JSON.parse(localStorage.getItem('ftpScore'));
  if (score === null) {
    score = {
      wins: 0
    };
  }
  document.querySelector('.toss-result').classList.add('emote-disabled');
  document.querySelector('.js-output-icon').classList.remove('head-icon');
  document.querySelector('.js-output-icon').classList.remove('tail-icon');
  document.querySelector('.score').innerText = score.wins;
}

document.querySelector('.reset-btn')
  .addEventListener('click',
    () => {
      handleReset();
    });

let isAutoPlay = false;
let intervalID;
function handleAutoPlay(){
  if(!isAutoPlay){
    document.querySelector('.js-auto-play').innerText = 'Pause Play';
    intervalID = setInterval(() => {
      let compAsUserMove = defineToss(compChoice());
      if(compAsUserMove === 'Head'){
        document.querySelector('.js-tail-input').style.setProperty('opacity', '0.7');
        document.querySelector('.js-head-input').style.removeProperty('opacity', '0.7');
        document.querySelector('.js-tail-input').classList.remove('choice-select');
        document.querySelector('.js-head-input').classList.add('choice-select');
        onTouch.play();
      }
      else if(compAsUserMove === 'Tail'){
        document.querySelector('.js-head-input').style.setProperty('opacity', '0.7');
        document.querySelector('.js-tail-input').style.removeProperty('opacity', '0.7');
        document.querySelector('.js-head-input').classList.remove('choice-select');
        document.querySelector('.js-tail-input').classList.add('choice-select');
        onTouch.play();
      }
      evaluateResult(compAsUserMove);
    }, 2000);
    isAutoPlay = true;
  }
  else{
    document.querySelector('.js-head-input').style.removeProperty('opacity', '0.7');
    document.querySelector('.js-tail-input').style.removeProperty('opacity', '0.7');
    document.querySelector('.js-head-input').classList.remove('choice-select');
    document.querySelector('.js-tail-input').classList.remove('choice-select');
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}

document.querySelector('.js-auto-play')
  .addEventListener('click',
    () => {
      handleAutoPlay();
    });