container = document.getElementById("sudoku-container")

cells = []



function start_solve() {
    
}


function init() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const elem = document.createElement("input")
            elem.className = "sudoku-cell"
            elem.id = "cell-"+(y+(9*x))
            cells.push(elem);
            container.appendChild(elem)

            console.log(cells[y + (9*x)])
        }
    }
}

init()