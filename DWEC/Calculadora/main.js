// Variables con los botones que se van a resaltar
const clearButton = document.getElementsByClassName('limpiar')[0];
const pointButton = document.getElementsByClassName('punto')[0];
const screenButton = document.getElementsByClassName('pantalla')[0];
const numbers = Array.from(document.getElementsByClassName('numero'));
const operators = Array.from(document.getElementsByClassName('operador'));
operators.push(document.getElementsByClassName('igual')[0]);


function modificacion(mod) {
    switch (mod) {
        case 'la_C':
            clearButton.style.backgroundColor = 'red';
            clearButton.style.color = 'white';
            break;
        case 'punto':
            pointButton.style.backgroundColor = 'purple';
            pointButton.style.color = 'white';
            break;
        case 'pant':
            screenButton.style.backgroundColor = 'darkblue';
            pointButton.style.color = 'white';
            break;
    }
}

function marcaDeNumeros() {
    numbers.forEach(num => {
        num.style.backgroundColor = 'black';
        num.style.color = 'white';
    })
}

function marcaDeOperadores() {
    operators.forEach(op => {
        op.style.backgroundColor = 'yellow';
        op.style.color = 'red'; 
    })
}

function resetGeneral() {
    const elements = [clearButton, pointButton, screenButton];

    numbers.forEach(num => elements.push(num));
    operators.forEach(op => elements.push(op));

    elements.forEach(element => element.style = '');
}

// Parte lógica de la aplicación
let seeResult = '';
let allResult = '';

function pulsada(symbol) {
    const symbols = [ '+', '-', '/', '.', '=', '*' ];

    if(symbols.includes(symbol)) {
        if(symbol === '.' && !seeResult.includes('.') && seeResult.length > 0) {
            seeResult += '.';
            allResult += '.';
            screenButton.textContent = seeResult;
        } else if(symbol === '='){
            seeResult = eval(allResult);
            screenButton.textContent = seeResult;
            seeResult = '';
        } else {
            allResult = eval(allResult) + symbol;
            seeResult = '';
        }
        console.log(allResult);
    } else if (symbol === 'C') {
        seeResult = '';
        allResult = '';
        screenButton.textContent = seeResult;
    } else {
        seeResult += symbol;
        allResult += symbol;
        screenButton.textContent = seeResult;
    }

}