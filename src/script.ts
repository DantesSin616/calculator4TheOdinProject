function add(a:number, b:number) {return a + b}
function subt(a:number, b:number) {return a - b}
function mult(a:number, b:number) {return a * b}
function divs(a:number, b:number) {return a / b}

/* Simple Logic for the calculator with 
simple arithmetic operations
such as: add, subt, mult, and divs */

function operate(a:number, operator:string, b:number){
    if(operator === "+"){
        return add(a, b);
    } else if(operator === "-") {
        return subt(a, b);
    } else if(operator === "*") {
        return mult(a, b);
    } else if(operator === "/") {
        return divs(a, b);
    }
    return 0
}

