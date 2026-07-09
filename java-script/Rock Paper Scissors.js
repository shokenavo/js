 
    let FinalResult = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    }
    change_show_result();
    function show_result(){
      document.querySelector('.Result')
      .innerHTML = result;
    }
    function Movements(x){
      document.querySelector('.movements')
      .innerHTML = `you <img  src="/images/${x}-emoji.png" class="move-img"> <img  src="/images/${computerMove}-emoji.png" class="move-img"> Computer`;
      console.log(x , computerMove);
    }
    function change_show_result(){
      document.querySelector('.js-show-Result')
      .innerHTML = `Wins : ${FinalResult.wins} , Losses : ${FinalResult.losses} , Ties : ${FinalResult.ties}`;
    }
    function PlayGame(PlayerMove) {
      if (PlayerMove === 'Scissors') {
        if (computerMove === 'Rock') {
          result = 'You lose.'
        } else if (computerMove === 'Paper') {
          result = 'You win.'
        } else if (computerMove === 'Scissors') {
          result = 'Tie.'
        }
      }
      else if (PlayerMove === 'Paper') {
        if (computerMove === 'Rock') {
          result = 'You win.';
        } else if (computerMove === 'Paper') {
          result = 'Tie.';
        } else if (computerMove === 'Scissors') {
          result = 'You lose.';
        }
      }
      else if (PlayerMove === 'Rock') {
        if (computerMove === 'Rock') {
          result = 'Tie.'
        } else if (computerMove === 'Paper') {
          result = 'You lose.'
        } else if (computerMove === 'Scissors') {
          result = 'You win.'
        }
      }
      if (result === 'You win.') {
        FinalResult.wins += 1;
      } else if (result === 'You lose.') {
        FinalResult.losses += 1;
      } else {
        FinalResult.ties += 1;
      }
      
      localStorage.setItem('score', JSON.stringify(FinalResult));



    }
    
    let computerMove = '';
    let result = '';

    function PickMovement() {

      let number = Math.random();

      if (number < 1 / 3) {
        computerMove = 'Rock'
      } else if (number > 1 / 3 && number < 2 / 3) {
        computerMove = 'Paper'
      } else if (number > 2 / 3) {
        computerMove = 'Scissors'
      }
    }
    PickMovement();
    