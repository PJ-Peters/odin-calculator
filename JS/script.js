//Global Variables
let total = '';
let firstValue = '';
let secondValue = '';
let currentValue = 'first'
let currentOperation = '';
let percentileActive = false;

//DOM Variables
let buttons = document.querySelectorAll('.btn');
let opBtns = document.querySelectorAll('.operation');
let primaryDisplay = document.querySelector('.primary-display');
let secondaryDisplay = document.querySelector('.secondary-display');

//DOM Event Listeners
buttons.forEach(buttons => buttons.addEventListener('click', routeInput));

//Parse input and run proper function
function routeInput(event) {
    switch (event.target.defaultValue) {
        case '0':
            numberInput(0);
            break;
        case '1':
            numberInput(1);
            break;
        case '2':
            numberInput(2);
            break;
        case '3':
            numberInput(3);
            break;
        case '4':
            numberInput(4);
            break;
        case '5':
            numberInput(5);
            break;
        case '6':
            numberInput(6);
            break;
        case '7':
            numberInput(7);
            break;
        case '8':
            numberInput(8);
            break;
        case '9':
            numberInput(9);
            break;
        case 'AC':
            clearCalculator();
            break;
        case '+/-':
            plusMinus();
            break;
        case '%':
            percent();
            break;
        case '.':
            numberInput('.')
            break;
            default:
                break;
    }
    if (firstValue.length >= 1) {
        switch (event.target.defaultValue) {
            case '÷':
                currentOperation = '÷'
                currentValue = 'second'
                document.querySelector('#divide').style.backgroundColor = "white";
                document.querySelector('#divide').style.color = "#fe9505";
                break;
            case 'x':
                currentOperation = 'x'
                currentValue = 'second'
                document.querySelector('#multiply').style.backgroundColor = "white";
                document.querySelector('#multiply').style.color = "#fe9505";
                break;
            case '-':
                currentOperation = '-'
                currentValue = 'second'
                document.querySelector('#subtract').style.backgroundColor = "white";
                document.querySelector('#subtract').style.color = "#fe9505";
                break;
            case '+':
                currentOperation = '+'
                currentValue = 'second'
                document.querySelector('#add').style.backgroundColor = "white";
                document.querySelector('#add').style.color = "#fe9505";
                break;
            case '=':
                compute(currentOperation, firstValue, secondValue);
                break;
            default:
                break;
        }
    }
}

//Update proper value and push to display
function numberInput(num) {
    if (currentValue === 'first') {
        if (percentileActive) {
            firstValue = num;
            percentileActive = false; 
        } else {
            firstValue += num;
        }
        primaryDisplay.textContent = firstValue;
    } else if (currentValue === 'second') {
        if (percentileActive) {
            secondValue = num;
            percentileActive = false; 
        } else {
            secondValue += num;
        }
        primaryDisplay.textContent = secondValue;
    } else {
        console.log('CURRENT VALUE ERROR: numberInput function');
    }
}

//Reset values and clear displays
function clearCalculator(option) {
    total = '';
    firstValue = '';
    secondValue = '';
    currentValue = 'first'
    currentOperation = '';
    percentileActive = false;
    opBtns.forEach(btn => btn.style.backgroundColor = "#fe9505");
    opBtns.forEach(btn => btn.style.color = "white");
    if (option !== 'keepDisplay') {
        primaryDisplay.textContent = '';
        secondaryDisplay.textContent = '';
    }
}

//Find total value based on current operation
function compute(op, value1, value2) {
    switch (op) {
        case '÷':
            if (value1 == 0 || value2 == 0) {
                total = 'NICE TRY!'
                break;
            }
            total = Number(value1) / Number(value2);
            break;
        case 'x':
            total = Number(value1) * Number(value2);
            break;
        case '-':
            total = Number(value1) - Number(value2);
            break;
        case '+':
            total = Number(value1) + Number(value2);
            break;
    }
    totalDisplay();
    clearCalculator('keepDisplay');
}

function totalDisplay() {
    primaryDisplay.textContent = total;
    secondaryDisplay.textContent = `${firstValue} ${currentOperation} ${secondValue}`;
}

function plusMinus() {
    if (currentValue === 'first') {
        if (firstValue > 0) {
            firstValue = `-${firstValue}`;
        } else {
            firstValue = firstValue.toString().substring(1);
        }
        primaryDisplay.textContent = firstValue;
    } else if (currentValue === 'second'){
        if (secondValue > 0) {
            secondValue = `-${secondValue}`;
        } else {
            secondValue = secondValue.toString().substring(1);
        }
        primaryDisplay.textContent = secondValue;
    }
    
}

function percent() {
    percentileActive = true;
    if (currentValue === 'first') {
        firstValue /= 100;
        primaryDisplay.textContent = firstValue;
    } else if (currentValue === 'second'){
        secondValue /= 100;
        primaryDisplay.textContent = secondValue;
    }
}