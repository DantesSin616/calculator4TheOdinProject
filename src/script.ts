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

// Initialize the calculator display
if (screenCurrentOperation) {
    screenCurrentOperation.textContent = '0';
}

window.addEventListener('keydown', keyboardInput);
btnEqual?.addEventListener('click', () => {
    console.log('Equals button clicked');
    evaluate();
});
btnClear?.addEventListener('click', clear);
btnDelete?.addEventListener('click', deleteNum);
btnPoint?.addEventListener('click', addPoint);

btnNums.forEach((button) =>
button.addEventListener('click', () => {
    console.log('Number button clicked:', button.textContent);
    appendNumber(button.textContent);
})
)

btnOprt.forEach((button) => 
button.addEventListener('click', () => {
    console.log('Operator button clicked:', button.textContent);
    setOperation(button.textContent);
})
)

function appendNumber(number:string){
    console.log('appendNumber called with:', number);
    console.log('Current screen content:', screenCurrentOperation?.textContent);
    console.log('shouldResetScreen:', shouldResetScreen);
    
    if(!screenCurrentOperation) return;
    if(screenCurrentOperation.textContent === '0' || shouldResetScreen){
        console.log('Resetting screen');
        resetScreen();
    }
    screenCurrentOperation.textContent += number;
    console.log('New screen content:', screenCurrentOperation.textContent);
}

function resetScreen(){
    if (screenCurrentOperation)
        screenCurrentOperation.textContent = '';
    shouldResetScreen = false;
}

function clear(){
    console.log('clear called');
    if(screenCurrentOperation) screenCurrentOperation.textContent = '0';
    if(screenLastOperation) screenLastOperation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperand = null;
    shouldResetScreen = false;
    console.log('After clear - all variables reset');
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
    console.log('setOperation called with:', oprt);
    console.log('Current firstOperand:', firstOperand);
    console.log('Current screen content:', screenCurrentOperation?.textContent);
    
    // If there's already an operation and a first operand, evaluate it first
    if (currentOperand && firstOperand && screenCurrentOperation && !shouldResetScreen) {
        console.log('Evaluating previous operation before setting new one');
        evaluate();
    }
    
    // Only set up the operation, do not evaluate
    if (screenCurrentOperation) {
        firstOperand = screenCurrentOperation.textContent;
        console.log('Set firstOperand to:', firstOperand);
    }
    currentOperand = oprt;
    if (screenLastOperation) screenLastOperation.textContent = `${firstOperand} ${currentOperand}`;
    shouldResetScreen = true;
    
    console.log('After setOperation - firstOperand:', firstOperand);
    console.log('After setOperation - currentOperand:', currentOperand);
    console.log('After setOperation - shouldResetScreen:', shouldResetScreen);
}

function deleteNum(){ 
   if (screenCurrentOperation) {
    const currentText = screenCurrentOperation.textContent || '';
    screenCurrentOperation.textContent = currentText.slice(0, -1);
    // If we delete everything, set to '0'
    if (screenCurrentOperation.textContent === '') {
        screenCurrentOperation.textContent = '0';
    }
   }
}

function evaluate(){
    console.log('evaluate called');
    console.log('screenCurrentOperation:', screenCurrentOperation);
    console.log('shouldResetScreen:', shouldResetScreen);
    console.log('currentOperand:', currentOperand);
    console.log('firstOperand:', firstOperand);
    console.log('Current screen content:', screenCurrentOperation?.textContent);
    
    if (screenCurrentOperation === null || shouldResetScreen || !currentOperand || !firstOperand) {
        console.log('Early return from evaluate - missing required values');
        return;
    }
    if ((currentOperand === '/' || currentOperand === '÷') && screenCurrentOperation.textContent === '0') {
        alert("You cannot divide by 0");
        return;
    }
    secondOperand = screenCurrentOperation.textContent;
    console.log('secondOperand:', secondOperand);
    
    const result = operate(currentOperand, firstOperand, secondOperand);
    console.log('Operation result:', result);
    
    screenCurrentOperation.textContent = `${roundResult(result)}`;
    if(screenLastOperation)
        screenLastOperation.textContent = `${firstOperand} ${currentOperand} ${secondOperand} =`;
    firstOperand = screenCurrentOperation.textContent;
    currentOperand = null;
    shouldResetScreen = true; // Reset screen for next operation
    
    console.log('After evaluate - firstOperand:', firstOperand);
    console.log('After evaluate - currentOperand:', currentOperand);
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
function add(a:number, b:number) {
    console.log('add function:', a, '+', b, '=', a + b);
    return a + b;
}
function subt(a:number, b:number) {
    console.log('subt function:', a, '-', b, '=', a - b);
    return a - b;
}
function mult(a:number, b:number) {
    console.log('mult function:', a, '*', b, '=', a * b);
    return a * b;
}
function divs(a:number, b:number) {
    console.log('divs function:', a, '/', b, '=', a / b);
    return a / b;
}


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
    console.log('operate function called with:');
    console.log('operator:', operator, 'type:', typeof operator);
    console.log('a:', a, 'type:', typeof a);
    console.log('b:', b, 'type:', typeof b);
    
    a = Number(a);
    b = Number(b);
    
    console.log('After Number conversion:');
    console.log('a:', a, 'type:', typeof a);
    console.log('b:', b, 'type:', typeof b);
    
    let result;
    switch(operator) {
        case '+': 
            result = add(a,b);
            console.log('Addition result:', result);
            return result;
        case '−': 
            result = subt(a,b);
            console.log('Subtraction result:', result);
            return result;
        case '×': 
            result = mult(a,b);
            console.log('Multiplication result:', result);
            return result;
        case '÷': 
            result = divs(a,b);
            console.log('Division result:', result);
            return result;
        default: 
            console.log('Default case - operator not recognized:', operator);
            return 0;
    }
}

