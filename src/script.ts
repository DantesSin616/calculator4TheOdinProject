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
let currentOperand:any = null;
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
    if(screenLastOperation) screenLastOperation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperand = null;
}

function addPoint(){
    if (!screenCurrentOperation) {
        return;
    }
    if (shouldResetScreen) {
        resetScreen();
    }
    if (screenCurrentOperation.textContent === ''){
        screenCurrentOperation.textContent = '0';
    }
    if (screenCurrentOperation.textContent.includes('.')) {
        return;
    }
    screenCurrentOperation.textContent += '.';
}

function setOperation(oprt:string){
    // Only set up the operation, do not evaluate
    if (screenCurrentOperation) firstOperand = screenCurrentOperation.textContent;
    currentOperand = oprt;
    if (screenLastOperation) screenLastOperation.textContent = `${firstOperand} ${currentOperand}`;
    shouldResetScreen = true;
}

function deleteNum(){ 
   if (screenCurrentOperation) 
    screenCurrentOperation.textContent = screenCurrentOperation.textContent 
    .toString()
    .slice(0, -1);
}

function evaluate(){
    if (screenCurrentOperation === null || shouldResetScreen) return;
    if ((currentOperand === '/' || currentOperand === '÷') && screenCurrentOperation.textContent === '0') {
        alert("You cannot divide by 0");
        return;
    }
    secondOperand = screenCurrentOperation.textContent;
    screenCurrentOperation.textContent = `${roundResult(
        operate(currentOperand, firstOperand, secondOperand)
    )}`;
    if(screenLastOperation)
        screenLastOperation.textContent = `${firstOperand} ${currentOperand} ${secondOperand} =`;
    firstOperand = screenCurrentOperation.textContent;
    currentOperand = null;
}


function roundResult(number:any) {
    return Math.round(number * 1000)/1000;
}

function convertOperator(keyboardOperator:string) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
  return keyboardOperator;
}

// basic arithmetic operations
function add(a:number, b:number) {return a + b}
function subt(a:number, b:number) {return a - b}
function mult(a:number, b:number) {return a * b}
function divs(a:number, b:number) {return a / b}


function keyboardInput(e:any){
    if (e.key >= 0 && e.key <= 9) return appendNumber(e.key);
    if (e.key === '.') return addPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNum();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(convertOperator(e.key));
    }
}


// Logic to operate
function operate(operator:any, a:any, b:any){
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+': return add(a,b);
        case '−': return subt(a,b);
        case '×': return mult(a,b);
        case '÷': return divs(a,b);
        default: return 0;
    }
}

