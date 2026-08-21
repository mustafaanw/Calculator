const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const multiply = function(num1, num2) {
  return num1 * num2;
};

const divide = function(num1, num2) {
    if (num2 === 0) {
        return "Error: Come on, I can't divide by 0!!";
    } else return num1 / num2;
};

const operate = function (num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case "+": return add(num1, num2);

        case "-": return subtract(num1, num2);

        case "*": return multiply(num1, num2);

        case "/": return divide(num1, num2);
    }

}

const numButtons = document.querySelectorAll(".number-buttons");
const operatorButton = document.querySelector(".operator-buttons");
const resultButton = document.querySelector(".result-button");
const clearButton = document.querySelector(".clear-button");
const display = document.querySelector(".display-text");

let num1 = "";
let operator = "";
let num2 = "";
let stage = "num1";
let result;
let freshNum1 = true;
let freshNum2 = true;
let justCalculated = false;

numButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            justCalculated = false;
            if (stage === "num1") {
                if (freshNum1) {
                    num1 = "";
                    freshNum1 = false;
                    display.classList.remove("error");
                }
                num1 += (e.target.textContent);
                display.textContent = num1;
            } else if (stage === "num2") {
                if (freshNum2) {
                    num2 = "";
                    freshNum2 = false;
                }
                num2 += (e.target.textContent);
                display.textContent = num2;
            }
        });
    });

operatorButton.addEventListener("click", (e) => {
    if (justCalculated) {
        operator = e.target.textContent;
        stage = "num2";
        freshNum2 = true;
        justCalculated = false;
        return;
    }

    if(stage === "num2"){
        const rsl = operate(num1, operator, num2);
        if (typeof rsl === "string") {
            display.textContent = rsl;
            display.classList.add("error");

            num1 = "";
            operator = "";
            num2 = "";
            stage = "num1";
            freshNum1 = true;
            freshNum2 = true;
            return;
        }
        num1 = rsl;
        operator = e.target.textContent;
        display.textContent = num1;
    } else {
        operator = e.target.textContent;
        stage = "num2";
    }
    freshNum2 = true;
});

resultButton.addEventListener("click", (e) => {
    if(!operator || num2 === "") return;
    result = operate(num1, operator, num2);
    display.textContent = result;

    if(typeof result === "string") {
        display.classList.add("error");

        num1 = "";
        operator = "";
        num2 = "";
        stage = "num1";
        freshNum1 = true;
        return;
    }

    display.classList.remove("error");
    num1 = String(result);
    operator = "";
    num2 = "";
    stage = "num1";
    freshNum1 = true;
    justCalculated = true;
});

clearButton.addEventListener("click", () => {
    num1 = "";
    operator = "";
    num2 = "";
    result = undefined;
    stage = "num1";
    display.textContent = "";
    display.classList.remove("error");
    freshNum1 = true;
    freshNum2 = true;
    justCalculated = false;
});