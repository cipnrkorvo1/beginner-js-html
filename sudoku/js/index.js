let container = document.getElementById("sudoku-container")

function loadScript(url) {    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

let grid = Array.from({ length: 9 }, () => Array(9).fill(-1));
// -1 means empty

document.getElementById("solve-btn").addEventListener("click", async () => {
    await start_solve();
});

async function start_solve() {
    // get all cells
    const cells = Array.from(document.getElementsByClassName("sudoku-cell"))
    cells.sort((a,b) => (a.x+9*(a.y)) - (b.x+9*(b.y)))

    // set internal grid to currently set grid
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            const cell = cells[x + (9*y)]
            if (cell.value === "") {
                grid[y][x] = -1;
            } else {
                grid[y][x] = Number(cell.value);
            }
        }
    }

    // default alg: bad brute force
    let alg = new BadBruteForce(grid, cells);
    if (await alg.solve()) {
        alert("solution found!");
        console.log(grid);
    } else {
        alert("no solution found ):");
    }
}

class Algorithm {

    seeChanges = false;

    constructor(grid, cells) {
        this.grid = grid;
        this.cells = cells
    }

    async solve() {
        throw new Error("Must use a concrete algorithm")
    }

    async setCell(pos, n) {
        this.cells[pos].value = n;
        if (this.seeChanges) {
            await new Promise(requestAnimationFrame);
        }
    }

    checkRow(y, n) {
        for (const cell of grid[y]) {
            if (cell == n) { return false; }
        }
        return true;
    }

    checkCol(x, n) {
        for (const row of grid) {
            if (row[x] == n) { return false; }
        }
        return true;
    }

    checkBox(x, y, n) {
        let Idxx = this.getBox(x, y)
        //console.log(Idxx)
        for (const [bx,by] of Idxx) {
            if (grid[by][bx] == n) {
                return false;
            }
        }
        return true;
    }

    getBox(x, y) {
        let Idxx = [
            [0,0],[0,1],[0,2],
            [1,0],[1,1],[1,2],
            [2,0],[2,1],[2,2]
        ]
        // shift depending on which box x,y is in
        Idxx.forEach(item => {
            item[0] += 3 * Math.floor(x/3);
            item[1] += 3 * Math.floor(y/3);
        })
        console.log(`getBox(${x},${y}) = ${Idxx}`)
        return Idxx;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class BadBruteForce extends Algorithm {

    constructor(grid, cells) {
        super(grid, cells)
    }

    async solve() {
        //console.log(super.checkBox(6, 6, 1));
        return await this.tryn(0, 0)
    }

    async tryn(x, y) {
        // invalid
        if (x < 0 || y < 0) {
            throw new Error("Invalid inputs x="+x+", y="+y)
        }
        // reached end of row; increment
        if (x > 8) {
            x = 0;
            y++;
        }
        // reached end of grid
        if (y > 8) {
            return true
        }
        // this cell is already set; skip trying
        //console.log("trying x="+x+", y="+y)
        if (grid[y][x] != -1) {
            return await this.tryn(x+1, y)
        }
        let to_try = [1,2,3,4,5,6,7,8,9]
        // start at a random position and then modulo
        let randM = Math.floor(Math.random() * 9 + 1)

        for (let i = 0; i < 9; i++) {
            let n = to_try[(i + randM) % 9]
            //console.log(`trying ${n} at (${x}, ${y})`)
            await super.setCell(x+(9*y), n)

            //await super.sleep(100);

            if (super.checkRow(y, n) &&
                super.checkCol(x, n) &&
                super.checkBox(x, y, n)) 
            {
                grid[y][x] = n;
                if (await this.tryn(x+1,y)) {
                    return true
                }
            }
        }

        await super.setCell(x+(9*y), "")
        grid[y][x] = -1;
        console.log("failed at ("+x+","+y+")")
        return false;

    }

}


function init() {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            const elem = document.createElement("input")
            elem.className = "sudoku-cell"
            elem.x = x
            elem.y = y
            
            // set styles
            if (y % 3 == 0) {
                elem.setAttribute("add-border-top", "")
            } else if (y % 3 == 2) {
                elem.setAttribute("add-border-bottom", "")
            }
            if (x % 3 == 0) {
                elem.setAttribute("add-border-left", "")
            } else if (x % 3 == 2) {
                elem.setAttribute("add-border-right", "")
            }

            container.appendChild(elem)

            //console.log("("+elem.x+","+elem.y+")")
        }
    }
}

init()