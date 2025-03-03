function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : 'Error'; }

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}


const display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function updateDisplay(value) {
    if (shouldResetScreen) resetScreen();
    display.textContent += value;
}

function clear() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

function handleOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === '/' && display.textContent === '0') {
        display.textContent = 'Cannot divide by 0!';
        return;
    }
    secondOperand = display.textContent;
    display.textContent = operate(currentOperator, firstOperand, secondOperand);
    currentOperator = null;
}


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (!action) updateDisplay(value);
        else if (action === 'clear') clear();
        else if (action === 'backspace') deleteLast();
        else if (action === 'decimal') addDecimal();
        else if (action === 'operator') handleOperator(value);
        else if (action === 'equals') evaluate();
    });
});

function deleteLast() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function addDecimal() {
    if (!display.textContent.includes('.')) updateDisplay('.');
}


window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) updateDisplay(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
    if (e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === '.') addDecimal();
    if (e.key === 'Escape') clear();
});
