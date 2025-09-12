"use strict";
function add(num1, num2) { return num1 + num2; }
function subt(num1, num2) { return num1 - num2; }
function mult(num1, num2) { return num1 * num2; }
function divs(num1, num2) { return num1 / num2; }
// ! adding addEventListener, but right now i dunno how they work
function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    }
    else if (operator === "-") {
        return subt(num1, num2);
    }
    else if (operator === "*") {
        return mult(num1, num2);
    }
    else if (operator === "/") {
        return divs(num1, num2);
    }
    return 0;
}
// function bttnClick(){
// let x = document.getElementById()
// }
function alertFunction() {
    alert("Made it.");
}
//# sourceMappingURL=script.js.map