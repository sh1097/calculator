const box = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, SecondOperand } =box;

  if (waitingForSecondOperand === true) {
   box.displayValue = digit;
    box.SecondOperand = false;
  } else {
    box.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (box.SecondOperand === true) {
  box.displayValue = "0."
   box.SecondOperand = false;
    return
  }

  if (!box.intialValue.includes(dot)) {
    box.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = box
  const inputValue = parseFloat(displayValue);
  
  if (operator && box.SecondOperand)  {
   box.operator = nextOperator;
    return;
  }


  if (firstOperand == null && !isNaN(inputValue)) {
    box.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

   box.displayValue = `${parseFloat(result.toFixed(7))}`;
   box.firstOperand = result;
  }

  box.SecondOperand = true;
  box.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetbox() {
 box.displayValue = '0';
  box.firstOperand = null;
 box.SecondOperand = false;
  box.operator = null;
}

function update() {
  const display = document.querySelector('.display');
  display.value = box.displayValue;
}

update();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  update();
});