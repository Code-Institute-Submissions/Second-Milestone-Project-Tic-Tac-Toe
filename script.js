let X_CLASS = 'x';
let O_CLASS = 'o';
let WIN_RESULT =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
let gameResult = document.querySelector('#gameResult');
let gameResultText = document.querySelector('.game-result-text');
let cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;


//Event Hanlers------------------------------------------------

//background color event handler 
const switchBox = document.getElementById('togBtn');

//x and o event handler 
const handleClick = function(e){
  const  cell = e.target;
  let activeClass = X_CLASS || O_CLASS;
  if (circleTurn ) {
    activeClass = O_CLASS;
} else {
    activeClass = X_CLASS;
};

if (checkWinner(activeClass)){
    
} else {
    
}

//show click
drawClick(cell, activeClass);

//next turn

nextTurn()


//cehecking for end result 

checkWinner(activeClass);





};

//Event Listeners------------------------------------------------

//background color

switchBox.addEventListener('change', function() {
    document.body.classList.toggle('black');
});
    
//x and o 
cellElements.forEach(function(cell) {
    cell.addEventListener('click', handleClick, { once:true })
});


//Function----------------------------------------------------------


//background color
function changeColor() {
document.body.classList.toggle('dark');
};

//x and o function 
function drawClick(cell, activeClass) {
    cell.classList.add(activeClass)
};

function nextTurn() {
    circleTurn = !circleTurn;
};

function checkWinner(activeClass) {
    return WIN_RESULT.some(value => {
        return value.every(index => {
            return cellElements[index].classList.contains(activeClass) 
        })
    })
};

