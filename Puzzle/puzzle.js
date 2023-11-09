// Creamos una matriz para almacenar los huecos que estén ocupados
let matriz = [
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
];

// La matriz solucionada sería la siguiente
const solution = [
    [ 1, 2, 3, 4 ],
    [ 5, 6, 7, 8 ],
    [ 9, 10, 11, 12 ],
    [ 13, 14, 15, 0 ]
]

// Creamos una fecha al inicio del programa para compararla posteriormenete
// con la fecha final a la que se acabara el ejercicio
const initDate = new Date();

// Creamos el array con el nombre de las imágenes
const images = [];
for(let i = 1; i <= 15; i++){ // El bucle es para añadir el nombre  
    images.push(i.toString());   // automáticamente (números)
}

// Función para rellenar la matriz aleatoriamente
function fillPuzzle(){
    let usedNums = [];

    for(let i = 0; i < matriz.length; i++){
        for(let j = 0; j < matriz[i].length; j++){
            if(i === 2 && j === 1){
                matriz[i][j] = 0; // Siempre se empezará el puzzle en esta posición
            } else {
                let num = findOne(usedNums);
                matriz[i][j] = images[num];
                usedNums.push(num);
            }
        }
    }
}

// Función para encontrar un elemento que no se haya usado ya
function findOne(arr){
    let num;
    
    do {
        num = Math.floor(Math.random() * 15);
    } while(arr.includes(num))

    return num;
}

// Función para añadir el puzzle desordenado al HTML
function createPuzzle(){
    const table = document.createElement('table');
    
    for(let i = 0; i < matriz.length; i++){
        const column = document.createElement('tr');
        for(let j = 0; j < matriz[i].length; j++){

            const row = document.createElement('td');

            if(matriz[i][j] !== 0){
                const img = document.createElement('img');
                img.setAttribute('src', `./img/${matriz[i][j]}.gif`);
                img.setAttribute('width', '100px');
                row.appendChild(img)

            }
            row.setAttribute('id', `${i}${j}`);
            row.addEventListener('click', function(){
                move(`${i}${j}`); // Se añade la función move a cada td
            });
            column.appendChild(row);
        }
        table.appendChild(column);
    }

    document.body.appendChild(table);
}

// Función que moverá la pieza
function move(pos){
    const cell = document.getElementById(pos);
    const imageToMove = cell.firstElementChild;
    const convertedPos = pos.split('');
    let cellToChange;

    // Declaración de las celdas adyacentes
    const nextCellValue = matriz[convertedPos[0]][Number(convertedPos[1]) + 1];
    const previousCellValue = matriz[convertedPos[0]][Number(convertedPos[1]) - 1];
    let upperCellValue = checkUndefined(Number(convertedPos[0]) - 1, convertedPos[1]); 
    let bottomCellvalue = checkUndefined(Number(convertedPos[0]) + 1, convertedPos[1]);

    // MOVIMIENTO HACIA A LA DERECHA
    if(nextCellValue === 0){
        // Obtenemos la celda siguiente buscandola por ID
        const searchId = [convertedPos[0], Number(convertedPos[1]) + 1].join('')
        cellToChange = document.getElementById(searchId);

        // Se intercambian los valores en la matriz
        matriz[convertedPos[0]][Number(convertedPos[1]) + 1] = matriz[convertedPos[0]][convertedPos[1]];
    } 
    // MOVIMIENTO HACIA A LA IZQUIERDA
    else if(previousCellValue === 0){
        // Obtenemos la celda anterior buscandola por ID
        const searchId = [convertedPos[0], Number(convertedPos[1]) - 1].join('')
        cellToChange = document.getElementById(searchId);

        // Se intercambian los valores en la matriz
        matriz[convertedPos[0]][Number(convertedPos[1]) - 1] = matriz[convertedPos[0]][convertedPos[1]];
    }
    // MOVIMIENTO HACIA ARRIBA
    else if(upperCellValue === 0){
        // Obtenemos la celda de arriba buscandola por ID
        const searchId = [Number(convertedPos[0]) - 1, convertedPos[1]].join('');
        cellToChange = document.getElementById(searchId);

        // Se intercambian los valores en la matriz
        matriz[Number(convertedPos[0]) - 1][convertedPos[1]] = matriz[convertedPos[0]][convertedPos[1]];
    } 
    // MOVIMIENTO HACIA ABAJO
    else if(bottomCellvalue === 0){
        // Obtenemos la celda de abajo buscandola por ID
        const searchId = [Number(convertedPos[0]) + 1, convertedPos[1]].join('');
        cellToChange = document.getElementById(searchId);

        // Se intercambian los valores en la matriz
        matriz[Number(convertedPos[0]) + 1][convertedPos[1]] = matriz[convertedPos[0]][convertedPos[1]];
    }

    // SI SE HA CAMBIADO UNA PIEZA, QUE LA CAMBIE EN EL HTML
    if(nextCellValue === 0 || previousCellValue === 0 || upperCellValue === 0 || bottomCellvalue === 0){
        matriz[convertedPos[0]][convertedPos[1]] = 0;

        // Se intercambian los valores en la tabla de HTML
        cell.removeChild(imageToMove);
        cellToChange.appendChild(imageToMove);

        checkSolution();
    }
}

// Para comprobar si los valores de la matriz que se le pasan
// son o no undefined (solo se usa para comprobar el valor de las filas)
function checkUndefined(row, col){
    if(matriz[row] === undefined){
        return undefined;
    } else {
        return matriz[row][col];
    }
}

// Comprueba si esta solucionado
function checkSolution(){
    let solucionado = true;
    
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(matriz[i][j] != solution[i][j]){
                solucionado = false;
            }
        }
    }

    if(solucionado){
        const finalDate = new Date();
        const time = (finalDate - initDate)/1000
        window.alert(`Se ha solucionado el ejercicio en: ${time} segundos`);
    }
}

fillPuzzle();
createPuzzle();