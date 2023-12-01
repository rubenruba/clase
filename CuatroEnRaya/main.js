// Game board
let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

const columns = document.getElementsByClassName('column');
let currentPlayer = 1;

// Add click event to the column, not to the cell
function addClickToColumn(){
    for(let i = 0; i < columns.length; i++){
        const currentColumn = columns[i];
        currentColumn.addEventListener('click', function(){
            dropDisc(currentColumn, i);
        })
    }
}

// Check the background of the cells in the column in reverse. If one is void, paint it
function dropDisc(column, columnNumber){
    const columnCells = Array.from(column.children);
    const columnCellsReverse = columnCells.reverse();
    let paint = false;

    columnCellsReverse.forEach(cell => {
        if(!cell.className.includes('yellow') && !cell.className.includes('red') && paint === false){
            cell.classList.add(currentPlayer === 1 ? 'red' : 'yellow');
            updateGameBoard(columnNumber);
            switchPlayer();
            paint = true; // Can be replaced with break?
        }
    })
}

// Swith to the other player
function switchPlayer() {
    (currentPlayer === 1) ? currentPlayer = 2 : currentPlayer = 1;
}

// Updates the gameBoard variable
function updateGameBoard(columnNumber){
    const gameBoardReverse = gameBoard.reverse();
    let paint = false;

    gameBoardReverse.forEach(row => {
        if(row[columnNumber] === 0 && paint === false){
            row[columnNumber] = currentPlayer;
            paint = true; // Can be replaced with break?;
        }
    })

    checkWin();

    gameBoard.reverse();
    console.log(gameBoard);
}

// Check if there is a win
function checkWin(){
    let win = false;

    // Check win in rows
    gameBoard.forEach(row => {
        for(let i = 0; i < row.length; i++){
            if(i < 4 && row[i] !== 0){
                if(row[i] === row[i+1] && row[i+2] && row[i] === row[i+3]){
                    win = true;
                    alert("WIN IN ROWS");
                }
            }
        }
    })

    // Check win in columns
    for(let i = 0; i < 7; i++){
        const start = gameBoard[0][i];
        if(start !== 0 && start === gameBoard[0][i+1] && start === gameBoard[0][i+2] && start === gameBoard[0][i+3]){
            win = true;
            alert("WIN IN COLUMNS");
        }
    }

    // for(let i = 0; i < gameBoard.length; i++){
    //     for(let j = 0; j < gameBoard[i].length; j++){
    //         // Check rows
    //         if(gameBoard[i][j] !== 0 && gameBoard[i][j] === gameBoard[i][j + 1] && gameBoard[i][j] === gameBoard[i][j + 2] && gameBoard[i][j] === gameBoard[i][j + 3]){
    //             win = true;
    //             alert("WIN IN ROWS")
    //         }
    //         // Check columns
    //         if(gameBoard[i][j] !== 0 && gameBoard[i][j] === gameBoard[i + 1][j] && gameBoard[i][j] === gameBoard[i + 2][j] && gameBoard[i][j] === gameBoard[i + 3][j]){
    //             win = true;
    //             alert("WIN IN COLUMNS")
    //         }
    //         // Check diagonals
    //         if(gameBoard[i][j] !== 0 && gameBoard[i][j] === gameBoard[i + 1][j + 1] && gameBoard[i][j] === gameBoard[i + 2][j + 2] && gameBoard[i][j] === gameBoard[i + 3][j + 3]){
    //             win = true;
    //             alert("WIN IN DIAGONALS")
    //         }
    //     } 
    // }
}

addClickToColumn();