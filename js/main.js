const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const calculator = qs("#calculator");

const outputElement = document.createElement("div");
outputElement.classList.add("output");
outputElement.setAttribute("id", "output");
outputElement.textContent = "0";
calculator.appendChild(outputElement);

const buttonsData = [
  "C",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

buttonsData.forEach((value) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = value;
  calculator.appendChild(button);
});

let currentNumber = "0";
let firstOperand = false;
let operator = false;

const updateOutput = () => {
  outputElement.textContent = currentNumber;
};

const handleButtonClick = (value) => {
  if (value === "=") {
    if (firstOperand && operator) {
      currentNumber = operate(
        operator,
        firstOperand,
        parseFloat(currentNumber)
      );
      firstOperand = null;
      operator = null;
    }
  } else if (value === "C") {
    currentNumber = "0";
    firstOperand = null;
    operator = null;
  } else if (value === "+/-") {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
  } else if (value === "%") {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
  } else if (["+", "-", "x", "/"].includes(value)) {
    if (!firstOperand && !operator) {
      firstOperand = parseFloat(currentNumber);
      operator = value;
    } else {
      currentNumber = operate(
        operator,
        firstOperand,
        parseFloat(currentNumber)
      );
      firstOperand = parseFloat(currentNumber);
      operator = value;
    }
  } else if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)
  ) {
    if (!firstOperand && !operator) {
      currentNumber === "0"
        ? (currentNumber = value)
        : (currentNumber += value);
    } else {
      currentNumber = value;
    }
  } else if (value === "." && !currentNumber.includes(".")) {
    currentNumber += value;
  }

  updateOutput();
};

const operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "x":
      return (num1 * num2).toString();
    case "/":
      return (num1 / num2).toString();
    default:
      return "Error";
  }
};

const buttons = qsa(".button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.textContent);
  });
});
