
//variables 

let xClass = 'x';           //cell's x class in html
let oClass = 'o';           //cell's x class in html
let WIN_RESULT = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];                          // all the winning combinations for the game
let noWinner = [[0], [1], [2], [3], [4], [5], [6], [7], [8]];       // the grid elements one by one 
let gameResult = document.querySelector('.end-result');             // pop up modal in thwe ned of a match 
let gameResultText = document.querySelector('.game-result-text');   // the modal announces the winner text
let cellElements = document.querySelectorAll('[data-cell]');        // each of the cell elements in the grid
let circleTurn;
let playerX = document.getElementById('playerX');                   //input of the playerX
let playerO = document.getElementById('playerO');                   //input of the player O
let playersSubmitO = document.getElementById('playersSubmitO');     //The value of the input of the player X
let playersSubmitX = document.getElementById('playersSubmitX');     //The value of the input of the player O
const soundX = document.getElementById('soundX');                   //sound of the X drawing
const soundO = document.getElementById('soundO');                   //sound of the O drawing 
const winningSound = document.getElementById('winningSound');       //sounfd of the check winner true 
const tieSound = document.getElementById('tieSound');               //sound if the game is tie 
const gameSong = document.querySelector('.tic-tac-toe-song');       //tic-tac-toe song in modal
const switchBox = document.getElementById('togBtn');                //background color switch button
let countdownClock = document.getElementById('countDown');          // cound down clock
let timeLeft = 60;                                                  // countdown set value for a minute (60 sec)
let timer;
let startScoreX = 0;                                                // set value of player x starting score 0
let startScoreO = 0;                                                // set value of player O starting score 0

// the start of the page wehn loaded and the modal is on show 
$(window).on('load', function () {
    $('#startingPage').modal('show');

     $('.mute-button').show();   //mute and sound button, sound is on mute is showing 
    $('.sound-button').hide();   
});

// tic tac toe song pause and play 
$('.game-song').on('click', function () {
    gameSong.play();
    $('#pauseBtn').show();
    $('#playBtn').hide();
});

$('#pauseBtn').on('click', function () {
    gameSong.pause();
    $('#playBtn').show();
    $('#pauseBtn').hide();
});

$('#playBtn').on('click', function () {
    gameSong.play();
    $('#pauseBtn').show();
    $('#playBtn').hide();
});
//close song modal and it stops playing the song and resets to 0
$('.close-song-modal').on('click', function () {
    gameSong.pause();
    $(gameSong).get(0).currentTime = 0;

});


// submit form with players name and error messages in case name is too long or name is not entered to the inputs 
$('#submitBtn').on('click', function (e) {
    let errorMessages = [];
    if (playerX.value === '' || playerX.value === null) {
        errorMessages.push("Player's name is required");                  // if not entered any value
    } else if (playerO.value === '' || playerO.value === null) {
        errorMessages.push("Player's name is required");
    }

    if (playerX.value.length >= '7') {
        errorMessages.push("Player's name max 6 character");
    } else if (playerO.value.length >= '7') {                           // if entered value is longer than 6 character 
        errorMessages.push("Player's name max 6 character");
    }

    if (errorMessages.length > 0) {
        e.preventDefault();
        document.getElementById('error').innerText = errorMessages.join(' , ');   // display error message 
    }

    else {
        $('#playersSubmitO').val(playerO.value);
        $('#playersSubmitX').val(playerX.value);
        $('#playersTurn').text('next turn: ' + playersSubmitX.value);
        $('.score-nameX').text(playersSubmitX.value);                               // else the modal is hide and the values get submitted
        $('.score-nameO').text(playersSubmitO.value);
        $('#startingPage').modal('hide');
        timer = setInterval(countdown, 1000);
    }
});

// count down function 
function countdown() {
    let minute = Math.floor(timeLeft / 60);
    let seconds = Math.floor(timeLeft % 60);                    

    countdownClock.innerHTML = minute + ":" + seconds;
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timeLeft = 0);
        countdownClock.innerHTML = 'the time is up';
        gameResultText.innerHTML = "Game over! No winner!";     // when time is up result message shown in a modal 
        gameResult.classList.add('show');
        $(gameResult).show();
    }
    
}


// handle click for the game, every clicked made for the grid, and in the cells 
const handleClick = function (e) {
    const cell = e.target;
    let activeClass = xClass || oClass; //either has an x or on o class in the grid 
    if (circleTurn) {
        activeClass = oClass;
        document.getElementById('playersTurn').innerText= 'next turn: ' + playersSubmitX.value ; // dislpayers the next turn on the top of the page 
        soundO.play();
    } else {
        activeClass = xClass;
        document.getElementById('playersTurn').innerText = 'next turn: ' + playersSubmitO.value ;
        soundX.play();
    }

    //show click, actually fill the grid with the players x or o 
    drawClick(cell, activeClass);

    if (checkWinner(activeClass)) {    //if the winner wasn't find yet it allowes to draw an x or an o to the grid
        gameOver(false);
    } else if (checkTie()) {
        gameOver(true);             // if all grids have been filled and no winner announced then it is a tie and there is no winner 
    }

    //next turn
    nextTurn();

    //cehecking for end result 
    checkWinner(activeClass);


    //checking for a tie 
    checkTie(activeClass);
};

//Event Listeners------------------------------------------------



//background color switch from light to dark 
switchBox.addEventListener('change', function () {
    document.body.classList.toggle('black');
});

function changeColor() {
    document.body.classList.toggle('black');
}



//x and o  event listener, every cell can only be clicked once, otherwise there wouldbe multiple classes to the same grid and the game would be broken 
cellElements.forEach(function (cell) {
    cell.addEventListener('click', handleClick, {
        once: true
    });

});


// when players want to rematch, and want to keep the ame names, function removes existing classes ans eventlistener, pauses and resets the timer, and adds the same evenlistener again with the click once as well as the new reseted time of 60sec 
$('#rematchButton').on('click', function () {
    $('div').removeClass(xClass);
    $('div').removeClass(oClass);
    $(gameResult).hide();
    cellElements.forEach(function (cell) {
        cell.addEventListener('click', handleClick, { once: true });
        clearInterval(timer);
    });
    timeLeft = 60; 
    timer = setInterval(countdown, 1000);
   
    
});


// game over function with a tie, a winner and an error. If winner is founbd message is displayed with the correct player's name, if a tie a tie message is displayed. In the case of error else statment apply
function gameOver(checkTie) {
    
    if (checkTie) {
        
        gameResultText.innerHTML = "No winner";
        tieSound.play();
    } else if (checkWinner) {

        gameResultText.innerHTML = `${circleTurn ? ('<i class="fas fa-circle-notch fa-spin"></i> ' + 'Congrats ' + playersSubmitO.value + '!' + ' <i class="fas fa-circle-notch fa-spin"></i>') : ('<i class="fas fa-times fa-spin"></i> ' + 'Congrats ' + playersSubmitX.value + '!' + ' <i class="fas fa-times fa-spin"></i>')}`;
        winningSound.play();
        setScore();

    } else {

        gameResultText.innerHTML = "Did you heck the system? &#128561";

    }
    gameResult.classList.add('show');           // adds the game result modal with the correct message and also clears countdown timer
    $(gameResult).show();
    clearInterval(timer);
}

// score display 
function setScore() {
    if (circleTurn) {
        startScoreO ++;
        document.getElementById('scoreO').innerText = startScoreO;
    } else {
        startScoreX ++;
        document.getElementById('scoreX').innerText = startScoreX;
    }
}

//function checks if cell has an active class and draws player x or o 
function drawClick(cell, activeClass) {
    cell.classList.add(activeClass);
}

//turns between players
function nextTurn() {
    circleTurn = !circleTurn;
}

//checking for the first true winning combination of the array, to meet the winner of the game 
function checkWinner(activeClass) {
    return WIN_RESULT.some(value => {
        return value.every(index => {           
            return cellElements[index].classList.contains(activeClass);
        });
    });
}

// checks for tie, if every cell contains either an o or and x cell and winner was not announced 
function checkTie(activeClass) {
    return noWinner.every(function (index) {
        return cellElements[index].classList.contains(xClass) || cellElements[index].classList.contains(oClass);
    });
}

//if players don't want to rematch but want to submit new players name then page reloads 
$('#newgameButton').on('click', function () {
    location.reload(true);
});

//mute button for all audio on the page 
$('.mute-button').on('click', function () {
    $('audio').prop('muted', true);
    $('.sound-button').show();
    $('.mute-button').hide();
});

// oposite of mute butten, turns sounds back on 
$('.sound-button').on('click', function () {
    $('audio').prop('muted', false);
    $('.mute-button').show();
    $('.sound-button').hide();
});
