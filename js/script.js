const history = document.querySelector("#history");
const output = document.querySelector("#output");
const clearAll = document.querySelector("#clearAll");
const backSpace = document.querySelector("#backSpace");
const percent = document.querySelector("#percent");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const dot = document.querySelector("#dot");
const result = document.querySelector("#result");

let clearOnNextClick = false;
let tmp1 = 0;
let tmp2 = 0;
let op1 = null;
let op2 = null;

const div = (a, b) => a / b;
const mul = (a, b) => a * b;
const sub = (a, b) => a - b;
const add = (a, b) => a + b;

const operate = (op, a, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  let res = 0;
  switch (op) {
    case "÷":
      res = div(a, b);
      break;
    case "×":
      res = mul(a, b);
      break;
    case "-":
      res = sub(a, b);
      break;
    case "+":
      res = add(a, b);
      break;
  }
  return checkResult(res);
};

const checkResult = (res) => {
  const resLen = 15;
  let str = res.toString();
  let copy = "";
  let i = 0;
  while (str[i] && i < resLen) {
    copy += str[i];
    i++;
  }
  let index = copy.indexOf(".");
  if ((index = -1)) {
    res = Number(copy);
  } else {
    let n = resLen - (index + 2);
    res = Math.round(Number(copy) * 10 ** n) / 10 ** n; // to check
  }
  return res;
};

for (let number of numbers) {
  number.addEventListener("click", (e) => {
    let res = e.target.textContent;
    if (output.value === "0" || clearOnNextClick) {
      output.value = res;
      clearOnNextClick = false;
    } else if (res === "." && output.value.includes(".")) {
      // do nothing
    } else {
      output.value += res;
    }
  });
}

for (let operator of operators) {
  operator.addEventListener("click", (e) => {
    history.value += `${output.value} ${e.target.textContent} `;
    if (!tmp1) {
      op1 = e.target.textContent;
      tmp1 = output.value;
    } else if (tmp1 && !tmp2) {
      op2 = e.target.textContent;
      tmp2 = output.value;
      if (
        op1 === "×" ||
        (op1 === "÷" && op2 !== "×") ||
        ((op1 === "+" || op1 === "-") && op2 !== "÷" && op2 !== "×")
      ) {
        tmp1 = operate(op1, tmp1, tmp2);
        op1 = op2;
        tmp2 = 0;
        op2 = null;
      }
    } else {
      tmp2 = operate(op2, tmp2, output.value);
      tmp1 = operate(op1, tmp1, tmp2);
      op1 = e.target.textContent;
      tmp2 = 0;
      op2 = null;
      output.value = tmp1;
    }
    clearOnNextClick = true;
  });
}

result.addEventListener("click", () => {
  history.value = "";
  if (!tmp1) {
    // do nothing
  } else if (tmp1 && !tmp2) {
    output.value = operate(op1, tmp1, output.value);
    tmp1 = 0;
    op1 = null;
  } else {
    if (
      op1 === "×" ||
      (op1 === "÷" && op2 !== "×") ||
      ((op1 === "+" || op1 === "-") && op2 !== "÷" && op2 !== "×")
    ) {
      tmp1 = operate(op1, tmp1, tmp2);
      output.value = operate(op2, tmp1, output.value);
    } else {
      tmp2 = operate(op2, tmp2, output.value);
      output.value = operate(op1, tmp1, tmp2);
    }
    tmp1 = 0;
    tmp2 = 0;
    op1 = null;
    op2 = null;
  }
  clearOnNextClick = true;
});

clearAll.addEventListener("click", () => {
  history.value = "";
  output.value = "0";
  tmp1 = 0;
  tmp2 = 0;
  op1 = null;
  op2 = null;
});

backSpace.addEventListener("click", () => {
  output.value = output.value.slice(0, -1);
});

percent.addEventListener("click", () => (output.value /= 100));
