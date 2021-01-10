let x_class = 'x'
let o_class = 'o'
let columnElements = document.querySelectorAll('[data-column]');
let oTurn;

columnElements.forEach(column => {
    column.addEventListener('click', handleClick, {once:true})
});

function handleClick(e) {
    //mark
let column = e.target;
let currentClass;
if (e == oTurn) {
    currentClass = o_class;
}
else {
    currentClass = x_class;
}


drawStep(column, currentClass)


    //swap turns
    //check for win
    //check for drew
    //rematch
    //start new game 
    changeTurns()
}

function drawStep(column, currentClass) {
    column.classList.add(currentClass)
}

function changeTurns() {
    oTurn= !oTurn;
}