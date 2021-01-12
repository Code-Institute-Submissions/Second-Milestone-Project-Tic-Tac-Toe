let X_CLASS = 'x';
let O_CLASS = 'o';
let cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;

//Event Hanlers------------------------------------------------

//background color event handler 
const switchBox = document.getElementById('togBtn');

//x and o event handler 
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


//Event Listeners------------------------------------------------

//background color

switchBox.addEventListener('change', () => {
    document.body.classList.toggle('black');
});
    
//x and o 
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once:true })
})


//Function----------------------------------------------------------


//background color
function changeColor() {
document.body.classList.toggle('dark');
};

//x and o function 
function drawClick(cell, activeClass) {
    cell.classList.add(activeClass)
}

function nextTurn() {
    circleTurn = !circleTurn;
}

