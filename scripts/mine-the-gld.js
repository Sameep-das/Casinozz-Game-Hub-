let gameMode = 'Easy';
let mineCellArr = [];
const cellArr = document.querySelectorAll('.grid-cells');
const modeArr = document.querySelectorAll('.mode-name');
let count = 1;
let multiplierEasy = [0, 1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0];
let multiplierMedium = [0, 1.3, 1.7, 2.0, 2.4, 2.8, 3.0, 3.5];
let multiplierHard = [0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
let score = {
  wins : '0x'
};

modeArr.forEach((val, index) => {
  modeArr[index].addEventListener('click', () => {
    gameMode = modeArr[index].id;
    generateMineCell();
    console.log(gameMode);
    console.log(mineCellArr);
  });
});

document.body
  .addEventListener('keydown', (event) => {
    if(event.key === 'e' || event.key === 'E'){
      gameMode = 'Easy';
      generateMineCell();
    }
    else if(event.key === 'm' || event.key === 'M'){
      gameMode = 'Medium';
      generateMineCell();
    }
    else if(event.key === 'h' || event.key === 'H'){
      gameMode = 'Hard';
      generateMineCell();
    }
    else if(event.key === 'Enter'){

    }
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
      document.querySelector('.current-mode-name').innerText = gameMode;
      userSelectCells.push(selectID);
    }
    else{
      document.querySelector('.current-mode-name').innerText = "Please Select Other Box";
    }
  });
});

function compChoice(){
  let randomNum = Math.random() * 100;
  return parseInt(randomNum % 9);
}

function generateMineCell(){
  mineCellArr = [];
  if(gameMode === 'Easy'){
    mineCellArr.push(compChoice());
  }
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
  if(mineCellArr.includes(userChoice)){
    defeatLogic(userChoice);
  }
  else{
    if(gameMode === 'Easy'){
      if(count < 8){
        victoryLogic(userChoice, 'Easy');
      }
    }
  }
}

function victoryLogic(userChoice, mode){
  count += 1;
  document.getElementById(`${userChoice}`).classList.add('gold-cell');
  score.wins = `${multiplier`${mode}`[count]}x`;
  document.querySelector('.score').innerText = score.wins;
}

function defeatLogic(){

}