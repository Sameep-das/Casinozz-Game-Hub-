import {getElementByClass, removeClass, addClass, addClassByID, removeClassByID, changeText} from './utils/dom_manipulation.js';
import { playOnReset, playOnTouch, pauseTouchSound } from './utils/audio.js';

let gameMode = 'Easy';
let mineCellArr = [];
const cellArr = document.querySelectorAll('.grid-cells');
const modeArr = document.querySelectorAll('.mode-name');
let count = 0;
let multiplier = {
  'Easy' : ['0x', '1.2x', '1.4x', '1.6x', '1.9x', '2.3x', '2.6x', '2.9x', '3.5x'],
  'Medium' : ['0x', '1.3x', '1.7x', '2.0x', '2.4x', '2.8x', '3.0x', '3.5x'],
  'Hard' : ['0x', '1.5x', '2.0x', '2.5x', '3.0x', '3.5x', '4.0x']
};

export let score = {
  wins : '0x'
};



modeArr.forEach((val, index) => {
  modeArr[index].addEventListener('click', () => {
    gameMode = modeArr[index].id;
    changeText('current-mode-name', gameMode);
    playOnTouch();
    resetGame();
  });
});

document.body
  .addEventListener('keydown', (event) => {
    if(event.key === 'e' || event.key === 'E'){
      gameMode = 'Easy';
      changeText('current-mode-name', gameMode);
      resetGame();
    }
    else if(event.key === 'm' || event.key === 'M'){
      gameMode = 'Medium';
      changeText('current-mode-name', gameMode);
      resetGame();
    }
    else if(event.key === 'h' || event.key === 'H'){
      gameMode = 'Hard';
      changeText('current-mode-name', gameMode);
      resetGame();
    }
    else if(event.key === 'Enter'){
      handleWithdraw();
    }
  });

document.querySelector('.withdraw-btn')
  .addEventListener('click', () => {
    handleWithdraw();
  });

document.querySelector('.js-generate')
  .addEventListener('click', () => {
    generateMineCell();
  });

let userSelectCells = []
cellArr.forEach((val, index) => {
  cellArr[index].addEventListener('click', () => {
    let selectID = parseInt(cellArr[index].id);
      if(!userSelectCells.includes(selectID)){
        userSelectCells.push(selectID);
        playOnTouch();
        
        playMTG(selectID);
      }
      else{
        changeText('current-mode-name', 'Please Select Other Boxes');
      }
  });
});

function compChoice(){
  let randomNum = Math.random() * 100;
  return parseInt(randomNum % 9);
}

function generateMineCell(){
  mineCellArr = [];
  //In Easy mode only one mine will be present
  if(gameMode === 'Easy'){
    mineCellArr.push(compChoice());
  }
  //In Medium mode the mineCellArr would contain 2 discrete indices representing the mines
  else if(gameMode === 'Medium'){
    mineCellArr.push(compChoice());
    let ind1 = compChoice();
    if(!mineCellArr.includes(ind1)){
      mineCellArr.push(ind1);
    }
    else{
      if(ind1 === 8){
        mineCellArr.push(ind1 - 2);
      }
      else{
        mineCellArr.push(ind1 + 1);
      }
    }
  }
  //In Hard mode the mineCellArr would contain 3 discrete indices representing the mines
  else if(gameMode === 'Hard'){
    mineCellArr.push(compChoice());
    let ind1 = compChoice();
    let ind2 = compChoice();
    if(!mineCellArr.includes(ind1)){
      mineCellArr.push(ind1);
    }
    else{
      if(ind1 === 8){
        mineCellArr.push(ind1 - 2);
      }
      else{
        mineCellArr.push(ind1 + 1);
      }
    }
    if(!mineCellArr.includes(ind2)){
      mineCellArr.push(ind2);
    }
    else{
      let sum = mineCellArr[0] + mineCellArr[1];
      let diff = Math.max(...mineCellArr) - Math.min(...mineCellArr);
      if(diff === 1){
        if(sum === 15){
          mineCellArr.push((compChoice()%5));
        }
        else if(sum === 1){
          mineCellArr.push((compChoice() * 3) + 2);
        }
        else{
          mineCellArr.push(Math.max(...mineCellArr) + 1);
        }
      }
      else{
        mineCellArr.push(Math.min(...mineCellArr) + 1);
      }
    }
  }
}

function playMTG(userChoice){
  changeText('current-mode-name', gameMode);
  if(mineCellArr.includes(userChoice)){
    defeatLogic(userChoice);
  }
  else{
    victoryLogic(userChoice);
  }
}

function victoryLogic(userChoice){
  count += 1;
  addClassByID(`${userChoice}`, 'gold-cell');
  score.wins = multiplier[`${gameMode}`][count];
  changeText('score', score.wins);
  changeText('victory-popup', score.wins);
  
  setTimeout(() => {
    removeClass('victory-popup', 'show-popup');
  }, 500);
  addClass('victory-popup', 'show-popup');

  if(gameMode === 'Easy' && count === 8){
    setTimeout(() => {
      resetGame();
    },800);
    changeText('current-mode-name', 'Victory');
  }
  else if(gameMode === 'Medium' && count === 7){
    
    setTimeout(() => {
      resetGame();
    },800);
    changeText('current-mode-name', 'Victory');
  }
  else if(gameMode === 'Hard' && count === 6){
    
    setTimeout(() => {
      resetGame();
    },800);
    changeText('current-mode-name', 'Victory');
  }
}

function defeatLogic(){

  mineCellArr.forEach((val) => {
    addClassByID(`${val}`, 'mine-cell');
  })
  setTimeout(() => {
    resetGame();
  },800);
  changeText('current-mode-name', 'Oops! Deafeat');
  addClass('defeat-popup', 'show-popup');
  
}

function resetGame(){
  count = 0;
  changeText('current-mode-name', gameMode);
  score.wins = '0x';
  changeText('score', score.wins);
  removeClass('defeat-popup', 'show-popup');
  removeClass('victory-popup', 'show-popup');
  userSelectCells.forEach((val) => {
    removeClassByID(`${val}`, 'gold-cell');
  });
  mineCellArr.forEach((val) => {
    removeClassByID(`${val}`, 'mine-cell');
  });
  mineCellArr = [];
  userSelectCells = [];
  generateMineCell();
}

function handleWithdraw(){
  setTimeout(() => {
    resetGame();
  }, 800);
  changeText('current-mode-name', 'Victory');
  playOnReset();
}
