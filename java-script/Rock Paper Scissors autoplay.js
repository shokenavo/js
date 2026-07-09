

let result = '';
let FinalResult = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}
change_show_result();
function show_result() {
  document.querySelector('.Result')
    .innerHTML = result;
}
function Movements(x, y) {
  document.querySelector('.movements')
    .innerHTML = `you <img  src="/images/${x}-emoji.png" class="move-img"> <img  src="/images/${y}-emoji.png" class="move-img"> Computer`;
}
function change_show_result() {
  document.querySelector('.js-show-Result')
    .innerHTML = `Wins : ${FinalResult.wins} , Losses : ${FinalResult.losses} , Ties : ${FinalResult.ties}`;
}
let is_auto_on = true;
let Interval;

let rock_button = document.querySelector('.js-button-rock');
rock_button.addEventListener('click', () => {
  PlayGame('Rock')
})
let Paper_button = document.querySelector('.js-button-paper');
Paper_button.addEventListener('click', () => {
  PlayGame('Paper');
})
let scissors_button = document.querySelector('.js-button-scissors');
scissors_button.addEventListener('click', () => {
  PlayGame('Scissors');
})


let auto_play = document.querySelector('.js-auto-play');
document.body.addEventListener('keydown', () => {
  if (is_auto_on) {
    Interval = setInterval(() => {
      document.querySelector('.js-auto-play').innerHTML = 'Stop Playing';
      const auto_move = PickMovement();
      PlayGame(auto_move);
    }, 1000);
    is_auto_on = false;
    id = false;
  } else {
    is_auto_on = true;
    auto_play.innerHTML = 'Auto Play'
    clearInterval(Interval);
  }
})

auto_play.addEventListener('click', () => {
  if (is_auto_on) {
    Interval = setInterval(() => {
      document.querySelector('.js-auto-play').innerHTML = 'Stop Playing';
      const auto_move = PickMovement();
      PlayGame(auto_move);
    }, 1000);
    is_auto_on = false;
    id = false;
  } else {
    is_auto_on = true;
    auto_play.innerHTML = 'Auto Play'
    clearInterval(Interval);


  }

})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    PlayGame('Paper');
  } else if (event.key === 's') {
    PlayGame('Scissors');
  } else if (event.key === 'r') {
    PlayGame('Rock');
  }
});


let PlayGame = (PlayerMove) => {
  computerMove = PickMovement();


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
  show_result();
  Movements(PlayerMove, computerMove);
  change_show_result();

}

function PickMovement() {

  let number = Math.random();

  if (number < 1 / 3) {
    computerMove = 'Rock';
    return computerMove;
  } else if (number > 1 / 3 && number < 2 / 3) {
    computerMove = 'Paper';
    return computerMove;
  } else if (number > 2 / 3) {
    computerMove = 'Scissors';
    return computerMove;
  }
}
let reset_js =document.querySelector('.js-reset-score');
reset_js.addEventListener('click' ,()=>{
  document.querySelector('.question-div').innerHTML =
  `Are You sure you want to reset the score ? <button class="question-button">YES</button><button class="question-button">NO</button>`
})



