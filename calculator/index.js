const display = document.getElementById("display");
const text = display.firstElementChild;

let stored = "0";
let operator = null;

let blinkInterval = null;

function refreshDisplay() {
    blink();
}

function num(num) {
    // If the last character is an underscore, replace it with the number
    if (text.innerHTML.endsWith("_")) {
        text.innerHTML = text.innerHTML.slice(0, -1) + num;
        return;
    }
    text.innerHTML += num + "";
    refreshDisplay();
}

function _store() {
    // Store the current text value without the underscore
    stored = text.innerHTML.endsWith("_") ? text.innerHTML.slice(0, -1) : text.innerHTML;
    console.log("Stored value:", stored);
    // Clear the text display for the next input
    text.innerHTML = "";
    blink();
}

function add() {
    _store();
    operator = "add";
}

function sub() {
    _store();
    operator = "sub";
}

function mul() {
    _store();
    operator = "mul";
}

function div() {
    _store();
    operator = "div";
}

function dec() {
    text.innerHTML += ".";
}

function compute() {
    if (operator == null) {
        return; // No operation to perform
    }
    clearInterval(blinkInterval);
    if (text.innerHTML.endsWith("_")) {
        text.innerHTML = text.innerHTML.slice(0, -1); // Remove the underscore if present
    }
    let currentValue = parseFloat(text.innerHTML);
    let storedValue = parseFloat(stored);
    let result;
    switch (operator) {
        case "add":
            result = storedValue + currentValue;
            break;
        case "sub":
            result = storedValue - currentValue;
            break;
        case "mul":
            result = storedValue * currentValue;
            break;
        case "div":
            if (currentValue === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = storedValue / currentValue;
            break;
        default:
            return; // No valid operator
    }
    text.innerHTML = result.toString();
}

function back() {
    // Remove the last character if it's not an underscore
    if (text.innerHTML.length > 0 && !text.innerHTML.endsWith("_")) {
        text.innerHTML = text.innerHTML.slice(0, -1);
    }
    refreshDisplay();
}

function erase() {
    text.innerHTML = "";
    stored = "0";
    operator = null;
    refreshDisplay();
}

function blink() {
    if (blinkInterval) {
        clearInterval(blinkInterval);
    }
    let showUnderscore = true;
    blinkInterval = setInterval(() => {
        if (showUnderscore) {
            text.innerHTML = text.innerHTML.replace(/_?$/, "_");
        } else {
            text.innerHTML = text.innerHTML.replace(/_$/, "");
        }
        showUnderscore = !showUnderscore;
    }, 500);
}

function init() {
    refreshDisplay();
}
init()