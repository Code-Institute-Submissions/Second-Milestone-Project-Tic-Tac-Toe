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
let noWinner = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let gameResult = document.querySelector('#gameResult');
let gameResultText = document.querySelector('.game-result-text');
let cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;


//Event Hanlers------------------------------------------------

//background color event handler 
const switchBox = document.getElementById('togBtn');

//x and o event handler 
const handleClick = function(e) {
	const cell = e.target;
	let activeClass = X_CLASS || O_CLASS;
	if (circleTurn) {
		activeClass = O_CLASS;
	} else {
		activeClass = X_CLASS;
	}


	//show click
	drawClick(cell, activeClass);


	
	function gameOver() {
		if (checkTie) {
			gameResultText.innerHTML = "No winner";
		} else if (checkWinner) {
			gameResultText.innerHTML = "Congrats .....! ...... win!";
		} else {
			gameResultText.innerHTML = "Is there a winner? &#128517";
		}
	}

    if (checkWinner(activeClass)) {
		gameOver(false);
	} else if (checkTie) {
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

switchBox.addEventListener('change', function() {
	document.body.classList.toggle('black');
});

//x and o 
cellElements.forEach(function(cell) {
	cell.addEventListener('click', handleClick, {
		once: true
	});
});


//Function----------------------------------------------------------


//background color
function changeColor() {
	document.body.classList.toggle('dark');
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

function checkTie() {
	return [...cellElements].every(function(cell) {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}
