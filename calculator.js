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
    return num1 / num2;
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

let num1 = "";
let operator = "";
let num2 = "";
let stage = "num1";
let result;

numButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (stage === "num1") {
                num1 += (e.target.textContent);
            } else if (stage === "num2") {
                num2 += (e.target.textContent);
            }
        });
    });

operatorButton.addEventListener("click", (e) => {
    operator = e.target.textContent;
    stage = "num2";
});

const resultButton = document.querySelector(".result-button");
resultButton.addEventListener("click", (e) => {
    if(!operator || num2 === "") return;
    result = operate(num1, operator, num2);
    alert (result);

    num1 = String(result);
    operator = "";
    num2 = "";
    stage = "num2";
});

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
    num1 = "";
    operator = "";
    num2 = "";
    result = undefined;
    stage = "num1";
});