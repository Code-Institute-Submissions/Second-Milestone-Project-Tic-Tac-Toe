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
let gameResult = document.querySelector('.game-result');
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

const switchBox = document.getElementById('togBtn');



/*$(document).ready(function() {
    $("#submitBtn").click(function() {
        $("#startingPage").css('visibility: hidden');
    });
    });*/

//Event Hanlers------------------------------------------------
$(window).on('load', function () {
    $('#startingPage').modal('show');
});


$('#submitBtn').on('click', function () {
    let errorMessages = [];
    if (playerX.value === '') {
        errorMessages.push("Player's name is required");
    } else if (playerO.value === '') {
        errorMessages.push("Player's name is required");
    }

    if (errorMessages.length > 0) {
        e.preventDefault();
        document.getElementById('error').innerText = errorMessages;
    }
    else { 
        $('#playersSubmitO').val(playerO.value);
        $('#playersSubmitX').val(playerX.value);
        $('#playersTurn').text(playersSubmitX.value);
        $('#startingPage').modal('hide') 

    }

});



//x and o event handler 
const handleClick = function (e) {
    const cell = e.target;
    let activeClass = X_CLASS || O_CLASS;
    if (circleTurn) {
        activeClass = O_CLASS;
        document.getElementById('playersTurn').innerText = playersSubmitX.value;
        soundO.play();
    } else {
        activeClass = X_CLASS;
        document.getElementById('playersTurn').innerText = playersSubmitO.value;
        soundX.play();
    }

    


    //show click
    drawClick(cell, activeClass);

    if (checkWinner(activeClass)) {
        gameOver(false);
    } else if (checkTie()) {
        gameOver(true);
    }

    function gameOver(checkTie) {
        if (checkTie) {
            gameResultText.innerHTML = "No winner";

        } else if (checkWinner) {
            gameResultText.innerHTML = "Congrats .....! ...... win!";
            winningSound.play();

        } else {
            gameResultText.innerHTML = "Did you heck the system? &#128561";
        }
        gameResult.classList.add('show');
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


/*$('#submitBtn').click(function() {
	$('#startingPage').modal('hide');
});*/



//x and o 
cellElements.forEach(function (cell) {
    cell.addEventListener('click', handleClick, {
        once: true
    });
});


//Function----------------------------------------------------------


//background color
function changeColor() {
    document.body.classList.toggle('black');
}



//x and o function 




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

