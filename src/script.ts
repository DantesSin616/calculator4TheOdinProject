const btnNums = document.querySelectorAll('[data-number]');
const btnOprt = document.querySelectorAll('[data-operator]');
const btnEqual = document.getElementById('equalsBtn');
const btnClear = document.getElementById('clearBtn');
const btnDelete = document.getElementById('deleteBtn');
const btnPoint = document.getElementById('pointBtn');
const screenLastOperation = document.getElementById('lastOprtDisplay');
const screenCurrentOperation = document.getElementById('currentOprtDisplay');


let firstOperand = '';
let secondOperand = '';
let currentOperand = null;
let shouldResetScreen = false;

window.addEventListener('keydown', keyboardInput);
btnEqual?.addEventListener('click', evaluate);
btnClear?.addEventListener('click', clear);
btnDelete?.addEventListener('click', deleteNum);
btnPoint?.addEventListener('click', addPoint);

btnNums.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

btnOprt.forEach((button) => 
button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number:string){
    if(!screenCurrentOperation) return;
    if(screenCurrentOperation.textContent === '0' || shouldResetScreen){
        resetScreen();
    }
    screenCurrentOperation.textContent += number;
}

function resetScreen(){
    if (screenCurrentOperation)
        screenCurrentOperation.textContent = '';
    shouldResetScreen = false;
}

function clear(){
    if(screenCurrentOperation) screenCurrentOperation.textContent = '0';
    if(screenLastOperation) screenLastOperation.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperand = false;

}

function addPoint(){
    console.log('addPoint called');
    if (!screenCurrentOperation) {
        console.log('screenCurrentOperation is null');
        return;
    }
    if (shouldResetScreen) {
        console.log('shouldResetScreen true, calling resetScreen');
        resetScreen();
    }
    if (screenCurrentOperation.textContent === ''){
        console.log('textContent empty, setting to 0');
        screenCurrentOperation.textContent = '0';
    }
    if (screenCurrentOperation.textContent.includes('.')) {
        console.log('Already contains dot, returning');
        return;
    }
    screenCurrentOperation.textContent += '.';
    console.log('Dot added, textContent now:', screenCurrentOperation.textContent);
}

function setOperation(oprt:string){}

function deleteNum(){ 
}

function evaluate(){}

// basic arithmetic operations
function add(a:number, b:number) {return a + b}
function subt(a:number, b:number) {return a - b}
function mult(a:number, b:number) {return a * b}
function divs(a:number, b:number) {return a / b}


function keyboardInput(){} 


// Logic to operate
function operate(a:any, b:any, operator:string){

    a = Number(a);
    b = Number(b);

    switch(operator) {

        case '+': 
            return add(a,b);
        case '-':
            return subt(a,b);
        case '*':
            return mult(a,b);
        case '/':
            return divs(a,b);
    }

    return 0
}

