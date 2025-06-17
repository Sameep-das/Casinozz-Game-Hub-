let userChoiceID; //INTEGER that holds the id of the cell selected by the user
const cellArray = document.querySelectorAll('.flex-cells'); //Array of all the 9 flex-cells.
let mineCell; //INTEGER that holds the cell id of the bomb. Defined by selectMineCell();
let count = 0; //INTEGER that holds the number of correct moves by the user
let userMoveRecord = []; //Array of userChoiceID. whenever user selects a cell, its ID is pushed here.
let multipler = [0, 1.3, 1.5, 1.7, 1.8, 2.00, 2.3, 2.50, 3.00]; //Reward array
let isAutoPlay = false; //Auto Play Flag
let intervalID; //Holds the intervalID returned by setInterval() during AutoPlay

/*EVENT LISTENER (CLICK) FOR ALL THE CELLS. IF AUTOPLAY IS OFF THE RESULT IS DISPLAYED DIRECTLY AND IF ONN THEN THE CELLS ARE PUSHED INTO THE ARRAY USERMOVERECORD[]*/
for(let i = 0; i < cellArray.length; i++){
  cellArray[i].addEventListener('click', (event) => {
    userChoiceID = parseInt(event.target.id);
    //If Auto Play is off then the result is directly shown
    if(!isAutoPlay) {
      if(mineCell === undefined) selectMineCell();
      else playMines(userChoiceID);
    }
    //If auto play is on then the cell is first pushed into the userMoveRecord[]
    else{
      if(!userMoveRecord.includes(userChoiceID)){
        document.getElementById(`${userChoiceID}`).style.setProperty('outline', '2px solid white');
        userMoveRecord.push(userChoiceID);
      }
    }
  });
}

/*EVENT LISTENER (KEYDOWN) FOR BODY ELEMENT - SPACE BAR FOR GENEARTING A GAME AND ENTER TO WITHDRAW*/
document.body
  .addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if(keyPressed === ' '){
      selectMineCell();
    }
    else if(keyPressed === 'Enter'){
      handleWithdraw();
    }
  });


/*TO GENERATE AN INDEX FOR THE MINE OR BOMB */
function selectMineCell(){
  let randomNo = parseInt(Math.random()*10);
  mineCell = randomNo % 9;
}


/*MAIN GAME LOGIC, WHICH TAKES THE USER CHOSEN CELL ID AS A PARAMETER AND MATCHES IT WITH THE MINECELL INDEX*/
function playMines(userMove) {
  let bool = userMoveRecord.includes(userMove);
  if(userMove !== mineCell && !bool){
    userMoveRecord.push(userMove);
    victoryLogic(userMove);
  }
  else if(bool){
    document.querySelector('.mine-result').innerText = "Select Other Box";
  }
  else{
    defeatLogic();
    setTimeout(() => {
      resetGame();
    }, 1000);
  }
}

/* RUNS WHEN PLAYER IS WINNING */
function victoryLogic(userMove){
  count += 1;
  cellArray[userMove].classList.add('gold-cells');
  document.querySelector('.victory-popup').innerText = `x${multipler[count]}`;
  setTimeout( () => {
    document.querySelector('.victory-popup').classList.remove('show-popup');
  }, 800);
  document.querySelector('.victory-popup').classList.add('show-popup');
  document.querySelector('.score').innerText = `x${multipler[count]}`;
  if(count < 5) document.querySelector('.mine-result').innerText = "Good Going";
  else if(count >= 5 && count < 8) document.querySelector('.mine-result').innerText = "Very Close...";
  else if(count === 8){
    document.querySelector('.mine-result').innerText = "Victory";
    setTimeout(() => {
      resetGame();
    }, 1000);
  }
}

/* RUNS WHEN PLAYER IS DEFEATED */
function defeatLogic(){
  cellArray[mineCell].classList.add('mine-cell');
  document.querySelector('.mine-result').innerText = "Defeat";
  setTimeout( () => {
    document.querySelector('.defeat-popup').classList.remove('show-popup');
  }, 800);
  document.querySelector('.defeat-popup').classList.add('show-popup');
  document.querySelector('.score').innerText = `x0`;
}

/*RESERT GAME LOGIC, RUNS WHEN AUTO PLAY IS CLICKED OR WHEN USER IS DEFEATED OR WHEN THE USER SELECTS ALL CORRECT MINES OR WHEN USER WITHDRAWS*/
function resetGame(){
  userMoveRecord = [];
  count = 0;

  document.querySelector('.mine-result').innerText = "1 Mine. 8 Gold.";
  document.querySelector('.score').innerText = `x0`;
  cellArray.forEach((value, index) => {
    if(index !== mineCell){
      cellArray[index].classList.remove('gold-cells');
    }else {
        cellArray[mineCell].classList.remove('mine-cell');
    }
  });
  selectMineCell();
}

/*WITHDRAW BUTTON EVENT LISTENER CLICK ADDED*/
document.querySelector('.withdraw-btn')
  .addEventListener('click', () => {
    handleWithdraw();
  });
  

/*TO HANDLE WITHDRAWAL. WHEN ENTER IS CLICKED OR WITHDRAW IS PRESSED.*/
function handleWithdraw(){
  document.querySelector('.mine-result').innerText = "You Won";
  document.querySelector('.victory-popup').innerText = `x${multipler[count]}`;
  setTimeout( () => {
      document.querySelector('.victory-popup').classList.remove('show-popup');
  }, 800);
  document.querySelector('.victory-popup').classList.add('show-popup');
  setTimeout(() => {
    resetGame();
  },1000);
}

/*Medium Level*/
let minesForMd = [
  selectMineCell(),
  selectMineCell()
];

function mediumMode(){
  
}

// /*EVENT LISTENER (CLICK) FOR AUTO PLAY BUTTON*/
// const autoPlayButton = document.querySelector('.js-auto-play');
// autoPlayButton
//   .addEventListener('click', () => {
//     document.querySelector('.js-submit').classList.remove('emote-disabled');
//     handleAutoPlay();
//   });


// /*EVENT LISTENER (CLICK) FOR SUBMIT BUTTON*/
// document.querySelector('.js-submit')
//   .addEventListener('click', () => {
//     document.querySelector('.js-auto-play').innerText = "Pause Play";
//     document.querySelector('.mine-result').innerText = "Sit Back & Chill";
//     intervalID = setInterval( () => {
//       autoPlayer();
//       selectMineCell();   
//     },2000);
//   });

// /*AUTO PLAY MODE FUNCTIONALITY THAT DISPLAYS THE CHOSEN CELLS*/
// function autoPlayer(){
//   let playermoveCopy = userMoveRecord.slice();
//   for(let i = 0; i < playermoveCopy.length; i++){
//     if(playermoveCopy[i] !== mineCell){
//       victoryLogic(playermoveCopy[i]);
//       console.log(playermoveCopy[i]);
//     }
//     else{
//       console.log(playermoveCopy[i]);
//       defeatLogic();
//     }
//   }
// }

// /*TO HANDLE THE AUTO PLAY MODE*/
// function handleAutoPlay(){
//   if(!isAutoPlay){
//     isAutoPlay = true;
//     resetGame();
//     document.querySelector('.mine-result').innerText = "Select Boxes";
//   } else{
//     isAutoPlay = false;
//     document.querySelector('.js-auto-play').innerText = "Auto Play";
//     clearInterval(intervalID);
//     resetGame();
//   }
// }


