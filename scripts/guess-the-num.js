let fillStatus = false;
let correctChoice;
let optionsArr = [];
let compOptsArr = [];
let playCount = 0;

let score = JSON.parse(localStorage.getItem('gtnScore'));
    if(!score){
      score = {
        wins : 0,
      };
    }

function handleReset(status)
{
  localStorage.removeItem('gtnScore');
  score = JSON.parse(localStorage.getItem('gtnScore'));
  if(score === null){
    score = {
      wins : 0
    };
  }
  
  document.querySelector('.game-result').classList.add('emote-disabled');
  if(status === 'Reset') 
  {
    document.querySelector('.score').innerText = score.wins;
    document.querySelector('.reset-btn').innerText = 'Reset Again';
  }
  else if(status === 'Reset Again'){
    handleReset('Reset');
  }
}

function compChoice(){
  let randomNo = Math.random();
  let computerMove = parseInt(randomNo*100);
  return computerMove;
}

function fillOptions(mode){
  if(mode === 'Medium') {
  optionsArr[0] = compChoice();
  optionsArr[1] = compChoice();
  optionsArr[2] = compChoice();
  document.getElementById('opt1').innerText = optionsArr[0];
  document.getElementById('opt2').innerText = optionsArr[1];
  document.getElementById('opt3').innerText = optionsArr[2];
  findCorrectOption('Medium');
  }
  else if(mode === 'Easy') {
    optionsArr[0] = compChoice();
    optionsArr[2] = compChoice();
    document.getElementById('opt1').innerText = optionsArr[0];
    document.getElementById('opt3').innerText = optionsArr[2];
    findCorrectOption('Easy');
  }
  else if(mode === 'Hard'){
    optionsArr[1] = compChoice();
    findCorrectOption('Hard');
  }
  fillStatus = true;
  
}

let autoPlayID;
let isAutoPlay = false;

function handleAutoPlay(mode){
  if(!isAutoPlay){
    fillOptions(mode);
    document.querySelector('.js-auto-play').innerText = 'Pause Play';
    autoPlayID = setInterval(function(){
      fillOptions(mode);
      document.getElementById('userChoice').value = autoselFromChoice(mode);
      handleInpField();
      computeResult(mode);
    },1800);
    isAutoPlay = true;
  }
  else{
    clearInterval(autoPlayID);
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
    isAutoPlay = false;
  }
}

function autoselFromChoice(mode){
  let index;
  let randomNo = parseInt(Math.random()*10);
  if(mode === 'Easy'){
    index = parseInt(randomNo%2);
    if(index === 0){
      return optionsArr[index];
    }
    else if(index === 1){
      return optionsArr[index+1];
    }
  }
  else if(mode === 'Medium'){
    index = parseInt(randomNo%3);
    console.log(`${correctChoice} : ${optionsArr} : ${optionsArr[index]}`);
    return optionsArr[index];
  }
  else if(mode === 'Hard'){
    return parseInt(randomNo*10);
  }
}

function handleTabPress(keyName, mode){
  if(keyName === 'Tab') fillOptions(mode);
}

function handleSlider(){
  let inputFieldVal = document.getElementById('userChoice');
  let sliderValue = document.getElementById('choiceSelector');
  inputFieldVal.value = sliderValue.value;
  sliderValue.oninput = function(){
    inputFieldVal.value = sliderValue.value;
  }
}

function handleInpField(){

  let inputFieldVal = document.getElementById('userChoice');
  let sliderValue = document.getElementById('choiceSelector');
  sliderValue.value = inputFieldVal.value;
  inputFieldVal.oninput = function(){
    sliderValue.value = inputFieldVal.value;
  }

}

function findCorrectOption(mode){
  if(mode === 'Medium') {
    let randomNo = Math.random()*10;
    let correctOption = (parseInt(randomNo))%3;
    if(correctOption === 0) correctChoice = optionsArr[0];
    else if(correctOption === 1) correctChoice = optionsArr[1];
    else if(correctOption === 2) correctChoice = optionsArr[2];
  }
  else if(mode === 'Easy'){
    let randomNo = Math.random()*10;
    let correctOption = (parseInt(randomNo))%2;
    if(correctOption === 0) correctChoice = optionsArr[0];
    else if(correctOption === 1) correctChoice = optionsArr[2];
  }
  else if(mode === 'Hard'){
    correctChoice = optionsArr[1];
  }
}

function handlePlayCount(mode){
  if((playCount >= 2 && mode === 'Medium') || (playCount === 1 && mode === 'Easy')){
    playCount = 0;
    fillOptions(mode);
    if(!isAutoPlay){
      document.getElementById('userChoice').value = '';
      document.getElementById('choiceSelector').value = 0;
    }
  }
  else if(mode === 'Hard' && playCount === 1){
    playCount = 0;
    fillOptions(mode);
    if(!isAutoPlay){
      document.getElementById('userChoice').value = '';
      document.getElementById('choiceSelector').value = 0;
    }
  }
}

function handlePlayChanges(mode){
  let userChoice = document.getElementById('userChoice').value;
  if(userChoice !== ''){
    let userChoiceInt = parseInt(userChoice);
    if(userChoiceInt === correctChoice) {
      document.querySelector('.game-result').classList.remove('emote-disabled');
      document.querySelector('.game-result').innerText = 'Victory';
      playCount = 0;
      score.wins += 1;
      localStorage.setItem('gtnScore', JSON.stringify(score));
      fillOptions(mode);
    }
    else{
      document.querySelector('.game-result').classList.remove('emote-disabled');
      document.querySelector('.game-result').innerText = 'Defeat';
      playCount += 1;
    }
  }
}

function handleMode(mode){
  fillOptions(mode);
  if(mode === 'Easy'){
    document.querySelector('.play-count').style.setProperty('opacity', '0');
    document.getElementById('opt2').style.setProperty('opacity', '0');
    document.getElementById('opt1').style.removeProperty('opacity');
    document.getElementById('opt3').style.removeProperty('opacity');
  }
  else if(mode === 'Medium'){
    document.querySelector('.play-count').style.removeProperty('opacity');
    document.getElementById('opt1').style.removeProperty('opacity');
    document.getElementById('opt2').style.removeProperty('opacity');
    document.getElementById('opt3').style.removeProperty('opacity');
  }
  else if(mode === 'Hard'){
    document.querySelector('.play-count').style.setProperty('opacity', '0');
    document.getElementById('opt1').style.setProperty('opacity', '0');
    document.getElementById('opt3').style.setProperty('opacity', '0');
    document.getElementById('opt2').style.removeProperty('opacity');
  }
}

function handleHard(){
  document.getElementById('opt2').innerText = optionsArr[1];
}

function assignCompOptValues(){
  compOptsArr[0] = parseInt(document.getElementById('opt1').innerText);
  compOptsArr[1] = parseInt(document.getElementById('opt2').innerText);
  compOptsArr[2] = parseInt(document.getElementById('opt3').innerText);
}

function computeResult(mode){
  assignCompOptValues();

  if(mode === 'Easy' && playCount < 1) {
    handlePlayChanges(mode);
  }
  else if(mode === 'Medium' && playCount <= 2){
    handlePlayChanges(mode);
  }
  else if(mode === 'Hard'){
    handlePlayChanges(mode);
    handleHard();
  }

  handlePlayCount(mode);

  document.querySelector('.play-count').innerText = `Play Count : ${playCount}`;
  document.querySelector('.score').innerText = score.wins;
}