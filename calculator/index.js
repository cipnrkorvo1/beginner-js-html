const display = document.getElementById("display");
const text = display.firstElementChild;

let blinkInterval = null;

function refreshDisplay() {
    blink();
}

function num(num) {
    text.innerHTML = num + "";
    refreshDisplay();
}

function add() {}

function sub() {}

function mul() {}

function div() {}

function dec() {}

function compute() {}

function back() {}

function erase() {
    text.innerHTML = "";
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