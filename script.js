let x_class = 'x'
let o_class = 'o'
let cellElements = document.querySelectorAll('[data-cell]');
let oTurn;

cellElements.forEach(column => {
    cell.addEventListener('click', handleClick, {once:true})
});

function handleClick(e) {
    //mark
let cell = e.target;
let currentClass;
if (e == oTurn) {
    currentClass = o_class;
}
else {
    currentClass = x_class;
}


drawStep(cell, currentClass)


    //swap turns
    //check for win
    //check for drew
    //rematch
    //start new game 
    changeTurns()
}

function drawStep(cell, currentClass) {
    cell.classList.add(currentClass)
}

function changeTurns() {
    oTurn= !oTurn;
}