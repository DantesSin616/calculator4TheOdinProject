"use strict";
// TODO : should be dislplaying some result on the console
// ? how to make the bttns work
// TODO : 
function btnClick() {
    let strdbttn1;
    let strdbttn2;
    let strdopt;
}
function main(num1, operator, num2) {
    if (operator === "+") {
        return addition(num1, num2);
    }
    else if (operator === "-") {
        return subtraction(num1, num2);
    }
    else if (operator === "*") {
        return multiplication(num1, num2);
    }
    else if (operator === "/") {
        return division(num1, num2);
    }
    return 0;
}
function addition(num1, num2) {
    return num1 + num2;
}
function subtraction(num1, num2) {
    return num1 - num2;
}
function multiplication(num1, num2) {
    return num1 * num2;
}
function division(num1, num2) {
    return num1 / num2;
}
console.log(main(10, "+", 5));
console.log(main(10, "-", 5));
console.log(main(10, "*", 5));
console.log(main(10, "/", 5));
//# sourceMappingURL=script.js.map