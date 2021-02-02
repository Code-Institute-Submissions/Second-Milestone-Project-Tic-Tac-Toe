let X_CLASS = 'x';
let O_CLASS = 'o';
let WIN_RESULT = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
let noWinner = [[0], [1], [2], [3], [4], [5], [6], [7], [8]];
let gameResult = document.querySelector('.end-result');
let gameResultText = document.querySelector('.game-result-text');
let cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;
let playersForm = document.getElementById('playersForm');

let playerX = document.getElementById('playerX');
let playerO = document.getElementById('playerO');
let playersSubmitO = document.getElementById('playersSubmitO');
let playersSubmitX = document.getElementById('playersSubmitX');
const soundX = document.getElementById('soundX');
const soundO = document.getElementById('soundO');
const winningSound = document.getElementById('winningSound');
const tieSound = document.getElementById('tieSound');
const timeIsUp = document.getElementById('timeIsUp');
const gameSong = document.querySelector('.tic-tac-toe-song');
const switchBox = document.getElementById('togBtn');

let countdownClock = document.getElementById('countDown');
let timeLeft = 60;
let timer;
let startScoreX = 0;
let startScoreO = 0;

//Event Hanlers------------------------------------------------
$(window).on('load', function () {
    $('#startingPage').modal('show');

     $('.mute-button').show();
    $('.sound-button').hide();
});


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

$('.close-song-modal').on('click', function () {
    gameSong.pause();
    $(gameSong).get(0).currentTime = 0;

})



$('#submitBtn').on('click', function (e) {
    let errorMessages = [];
    if (playerX.value === '' || playerX.value == null) {
        errorMessages.push("Player's name is required");
    } else if (playerO.value === '' || playerO.value == null) {
        errorMessages.push("Player's name is required");
    }

    if (playerX.value.length >= '7') {
        errorMessages.push("Player's name max 6 character");
    } else if (playerO.value.length >= '7') {
        errorMessages.push("Player's name max 6 character");
    }

    if (errorMessages.length > 0) {
        e.preventDefault();
        document.getElementById('error').innerText = errorMessages.join(' , ');
    }

    else {
        $('#playersSubmitO').val(playerO.value);
        $('#playersSubmitX').val(playerX.value);
        $('#playersTurn').text('next turn: ' + playersSubmitX.value);
        $('.score-nameX').text(playersSubmitX.value);
        $('.score-nameO').text(playersSubmitO.value);
        $('#startingPage').modal('hide')
        timer = setInterval(countdown, 1000);
    }
       

});

function countdown() {
    let minute = Math.floor(timeLeft / 60);
    let seconds = Math.floor(timeLeft % 60);

    countdownClock.innerHTML = minute + ":" + seconds;
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timeLeft = 0);
        countdownClock.innerHTML = 'the time is up'
        gameResultText.innerHTML = "Game over! No winner!"
        gameResult.classList.add('show')
        $(gameResult).show();
    }
    
};


//x and o event handler 
const handleClick = function (e) {
    const cell = e.target;
    let activeClass = X_CLASS || O_CLASS;
    if (circleTurn) {
        activeClass = O_CLASS;
        document.getElementById('playersTurn').innerText= 'next turn: ' + playersSubmitX.value ;
        soundO.play();
    } else {
        activeClass = X_CLASS;
        document.getElementById('playersTurn').innerText = 'next turn: ' + playersSubmitO.value ;
        soundX.play();
    }




    //show click
    drawClick(cell, activeClass);

    if (checkWinner(activeClass)) {
        gameOver(false);
    } else if (checkTie()) {
        gameOver(true);
    }



    //next turn

    nextTurn();


    //cehecking for end result 

    checkWinner(activeClass);


    //checking for a tie 

    checkTie(activeClass);




};

//Event Listeners------------------------------------------------



//background color

switchBox.addEventListener('change', function () {
    document.body.classList.toggle('black');
});





//x and o 


cellElements.forEach(function (cell) {
    cell.addEventListener('click', handleClick, {
        once: true
    });

});


$('#rematchButton').on('click', function () {
    $('div').removeClass(X_CLASS);
    $('div').removeClass(O_CLASS);
    $(gameResult).hide();
    cellElements.forEach(function (cell) {
        cell.addEventListener('click', handleClick, { once: true });
        clearInterval(timer);
    });
    timeLeft = 60; 
    timer = setInterval(countdown, 1000);
   
    
});




//Function----------------------------------------------------------


//background color
function changeColor() {
    document.body.classList.toggle('black');
}



//x and o function 

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
    gameResult.classList.add('show');
    $(gameResult).show();
    clearInterval(timer);
};


function setScore() {
    if (circleTurn) {
        startScoreO ++;
        document.getElementById('scoreO').innerText = startScoreO;
    } else {
        startScoreX ++;
        document.getElementById('scoreX').innerText = startScoreX;
    }
}

function drawClick(cell, activeClass) {
    cell.classList.add(activeClass);
}

function nextTurn() {
    circleTurn = !circleTurn;
}

function checkWinner(activeClass) {
    return WIN_RESULT.some(value => {
        return value.every(index => {
            return cellElements[index].classList.contains(activeClass);
        });
    });
}

function checkTie(activeClass) {
    return noWinner.every(function (index) {
        return cellElements[index].classList.contains(X_CLASS) || cellElements[index].classList.contains(O_CLASS);
    });
}

$('#newgameButton').on('click', function () {
    location.reload(true)
});

$('.mute-button').on('click', function () {
    $('audio').prop('muted', true);
    $('.sound-button').show();
    $('.mute-button').hide();
});

$('.sound-button').on('click', function () {
    $('audio').prop('muted', false);
    $('.mute-button').show();
    $('.sound-button').hide();
});
