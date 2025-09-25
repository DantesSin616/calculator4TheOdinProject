"use strict";
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
// Initialize the calculator display
if (screenCurrentOperation) {
    screenCurrentOperation.textContent = '0';
}
window.addEventListener('keydown', keyboardInput);
btnEqual?.addEventListener('click', evaluate);
btnClear?.addEventListener('click', clear);
btnDelete?.addEventListener('click', deleteNum);
btnPoint?.addEventListener('click', addPoint);
btnNums.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent?.trim())));
btnOprt.forEach((button) => button.addEventListener('click', () => setOperation(button.textContent?.trim())));
function appendNumber(number) {
    if (!screenCurrentOperation)
        return;
    if (screenCurrentOperation.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    screenCurrentOperation.textContent += number;
}
function resetScreen() {
    if (screenCurrentOperation)
        screenCurrentOperation.textContent = '';
    shouldResetScreen = false;
}
function clear() {
    if (screenCurrentOperation)
        screenCurrentOperation.textContent = '0';
    if (screenLastOperation)
        screenLastOperation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperand = null;
    shouldResetScreen = false;
}
function addPoint() {
    if (!screenCurrentOperation) {
        return;
    }
    if (shouldResetScreen) {
        resetScreen();
    }
    if (screenCurrentOperation.textContent === '') {
        screenCurrentOperation.textContent = '0';
    }
    if (screenCurrentOperation.textContent.includes('.')) {
        return;
    }
    screenCurrentOperation.textContent += '.';
}
function setOperation(oprt) {
    // If there's already an operation and a first operand, evaluate it first
    if (currentOperand && firstOperand && screenCurrentOperation && !shouldResetScreen) {
        evaluate();
    }
    // Only set up the operation, do not evaluate
    if (screenCurrentOperation) {
        firstOperand = screenCurrentOperation.textContent;
    }
    currentOperand = oprt;
    if (screenLastOperation)
        screenLastOperation.textContent = `${firstOperand} ${currentOperand}`;
    shouldResetScreen = true;
}
function deleteNum() {
    if (screenCurrentOperation) {
        const currentText = screenCurrentOperation.textContent || '';
        screenCurrentOperation.textContent = currentText.slice(0, -1);
        // If we delete everything, set to '0'
        if (screenCurrentOperation.textContent === '') {
            screenCurrentOperation.textContent = '0';
        }
    }
}
function evaluate() {
    if (screenCurrentOperation === null || shouldResetScreen || !currentOperand || !firstOperand) {
        return;
    }
    if ((currentOperand === '/' || currentOperand === '÷') && screenCurrentOperation.textContent === '0') {
        alert("You cannot divide by 0");
        return;
    }
    secondOperand = screenCurrentOperation.textContent;
    const result = operate(currentOperand, firstOperand, secondOperand);
    const roundedResult = roundResult(result);
    screenCurrentOperation.textContent = `${roundedResult}`;
    if (screenLastOperation)
        screenLastOperation.textContent = `${firstOperand} ${currentOperand} ${secondOperand} =`;
    firstOperand = screenCurrentOperation.textContent;
    currentOperand = null;
    shouldResetScreen = true;
}
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/')
        return '÷';
    if (keyboardOperator === '*')
        return '×';
    if (keyboardOperator === '-')
        return '−';
    if (keyboardOperator === '+')
        return '+';
    return keyboardOperator;
}
// basic arithmetic operations
function add(a, b) { return a + b; }
function subt(a, b) { return a - b; }
function mult(a, b) { return a * b; }
function divs(a, b) { return a / b; }
function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9)
        return appendNumber(e.key);
    if (e.key === '.')
        return addPoint();
    if (e.key === '=' || e.key === 'Enter')
        evaluate();
    if (e.key === 'Backspace')
        deleteNum();
    if (e.key === 'Escape')
        clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(convertOperator(e.key));
    }
}
// Logic to operate
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+': return add(a, b);
        case '−': return subt(a, b);
        case '×': return mult(a, b);
        case '÷': return divs(a, b);
        default: return 0;
    }
}
//# sourceMappingURL=script.js.map