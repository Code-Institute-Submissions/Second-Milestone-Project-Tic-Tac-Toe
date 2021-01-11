let X_CLASS = 'x';
let O_CLASS = 'o';
let cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;
//Event Hanlers

const handleClick = e => {
  const  cell = e.target;
  let activeClass;
  if (circleTurn == true) {
    activeClass = O_CLASS;
} else {
    activeClass = X_CLASS;
}

//show click
drawClick(cell, activeClass);

//next turn

nextTurn()
};


//Event Listeners 

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once:true })
})


//Function

function drawClick(cell, activeClass) {
    cell.classList.add(activeClass)
}

function nextTurn() {
    circleTurn = !circleTurn;
}

