
    let userChoice = '';
    
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
    document.querySelector('.js-score').innerText = `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`;

    function handleReset(status)
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
      if(status === 'Reset Score') 
      {
        document.querySelector('.score').innerText = score.wins;
        status = 'Reset Again';
        // document.querySelector('.reset-btn').classList.add('click-reset');
      }
    }
    
    function compChoice(){
      let randomNo = Math.random();
      let compChoice;
      if(randomNo >= 0 && randomNo < 1/3) compChoice = 'rock';
      else if(randomNo >= 1/3 && randomNo < 2/3) compChoice = 'paper';
      else compChoice = 'scissors';
      return compChoice;
    }

    function computeResult(userChoice, compChoice){
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

    function computeScore(result){
      document.querySelector('.js-userChoice').classList.remove('emote-disabled');
      document.querySelector('.js-compChoice').classList.remove('emote-disabled');
      document.querySelector('.js-result').classList.remove('emote-disabled');

      if(result === 1){
        score.wins += 1;
        document.querySelector('.js-result').innerText = 'Victory!';
      }
      else if(result === 0.5){
        score.ties += 1;
        document.querySelector('.js-result').innerText = 'Game Tie';
      }
      else{
        score.losses += 1;
        document.querySelector('.js-result').innerText = 'Oops! Defeat';
      }

      localStorage.setItem('rpsScore', JSON.stringify(score));
      document.querySelector('.score').innerText = score.wins;
      document.querySelector('.js-score').innerText = `Wins : ${score.wins} | Losses : ${score.losses} | Ties : ${score.ties}`;
    }


    let autoPlayID;
    let isAutoPlay = false;

    function handleAutoPlay(){
      if(!isAutoPlay){
        document.querySelector('.js-auto-play').innerText = 'Pause Play';
        autoPlayID = setInterval(function(){
          computeScore(computeResult(compChoice(),compChoice()))
        }, 1200);
        isAutoPlay = true;
      }
      else {
        document.querySelector('.js-auto-play').innerText = 'Auto Play';
        clearInterval(autoPlayID);
        isAutoPlay = false;
      }
      
    }