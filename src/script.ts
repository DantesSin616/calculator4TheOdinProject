const btnNums = document.querySelectorAll('[data-number]');
const btnOprt = document.querySelectorAll('[data-operator');
const btnEqual = document.querySelectorAll('[equalsBtn]');
const btnClear = document.querySelectorAll('[clearBtn]');
const btnDelete = document.querySelectorAll('[deleteBtn]');
const btnPoint = document.querySelectorAll('[pointBtn]');
const screeLastOperation = document.querySelectorAll('[lastOprtDisplay]');
const screeCurrentOperation = document.querySelectorAll('[currentOprtDisplay]');

let firstOperand = '';
let secondOperand = '';
let operand = '';
let currentOperand = null;

window.addEventListener('keydown', keyboardInput);


btnNums.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

function appendNumber(number:any){}


function deleteNum(){
    
}


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

