// TODO : should be dislplaying some result on the console
// ? how to make the bttns work
// TODO : 

function btnClick(){
    let strdbttn1;
    let strdbttn2;
    let strdopt; 
}

function main(num1:number, operator:string, num2:number){

    if(operator === "+"){
        return addition(num1, num2);
    } else if(operator === "-"){
        return subtraction(num1, num2);
    } else if(operator === "*"){
        return multiplication(num1, num2);
    } else if(operator === "/"){
        return division(num1, num2);
    }
    return 0
}

function addition(num1: number, num2: number){
    return num1 + num2;
}

function subtraction(num1: number, num2: number){
    return num1 - num2;
}

function multiplication(num1: number, num2: number){
    return num1 * num2;
}

function division(num1: number, num2: number){
    return num1 / num2;
}   

console.log(main(10, "+", 5));
console.log(main(10, "-", 5));
console.log(main(10, "*", 5));
console.log(main(10, "/", 5));