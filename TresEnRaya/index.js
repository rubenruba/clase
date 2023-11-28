const gameContainer = document.getElementById('game-container');
const currentPlayer = document.getElementById('current');
let tableGame = ['', '', '', '', '', '', '', '', ''];
let current = 'X';
let win = false;

function createCellGames(){
    currentPlayer.textContent = current;

    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.id = i;
        cell.addEventListener('click', function(){
            setMark(i);
        });
        gameContainer.appendChild(cell);
    }
}

function setMark(id){
    const cellToMark = document.getElementById(id);
    if(cellToMark.textContent === '' && win === false){
        cellToMark.textContent = current;
        cellToMark.className = cellToMark.className + ' current' + current; 
        tableGame[id] = current;
        gameWinner();
        changeMark();
        currentPlayer.textContent = current;
        currentPlayer.classList = 'current' + current
    }
}

function changeMark(){
    if(current === 'X'){
        current = 'O';
    } else {
        current = 'X';
    }
}

function resetGame(){
    const cells = document.getElementsByClassName('game-cell');

    for(let i = 0; i < cells.length; i++){
        cells[i].textContent = '';
        cells[i].className = 'game-cell';
    }

    tableGame = ['', '', '', '', '', '', '', '', ''];
    win = false;
}

function gameWinner(){
    for(let i = 0; i < 3; i++){
        const num = i * 3;
        // Check the rows
        if(tableGame[num] === tableGame[num+1] && tableGame[num] === tableGame[num+2] && tableGame[num] !== ''){
            win = true;
            alert('WIN ROW')
        }
        // Check the columns
        if(tableGame[i] === tableGame[i+3] && tableGame[i] === tableGame[i+6] && tableGame[i] !== ''){
            win = true;
            alert('WIN COLUMN')
        }
    }

    // Chec the diagonals
    if(tableGame[0] === tableGame[4] && tableGame[0] === tableGame[8] && tableGame[0] !== '') {
        win = true;
        alert('WIN DIAGONAL')
    } else if(tableGame[2] === tableGame[4] && tableGame[2] === tableGame[6] && tableGame[2] !== '') {
        win = true;
        alert('WIN DIAGONAL')
    }
}

createCellGames();