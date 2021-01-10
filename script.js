let x_class= 'x';
let o_class= 'o';
let columnElement = document.querySelectorAll('[data-column]');

columnElements.forEach(column => {
    column.addEventListener('click', handleClick, {once:true})
});

function handleClick(e) {
    //mark
    //check for win
    //check for drew
    //rematch
    //start new game 
}