const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\n\n')

const maze = input[0].split('\n').map(row => row.split(""));
const directions = input[1].match(/\d+|(L|R)/g);

const maxRows = maze.length
const maxCols = maze[0].length

let row = 0;
let col = maze[0][0].indexOf('.');
let dir = "R";

let pointerRow = 0;
let pointerCol = 0;
let pointerDir = "R"

const facingValue = {
    "R" : 0,
    "D" : 1,
    "L" : 2,
    "T" : 3,
}

function move() {
    pointerDir = dir;

    while (true) {
        let lastRow = pointerRow;
        let lastCol = pointerCol;
        let lastDir = pointerDir;
    
        let row = pointerRow;
        let col = pointerCol;
    
        if (0 <= row && row <= 49 && 50 <= col && col <= 99) {
            if (pointerDir == "T" && row == 0) {
                lastRow = 150 + (col - 50);
                lastCol = 0;
                lastDir = "R";
            } else if (pointerDir == "L" && col == 50) {
                lastRow = 149 - (row - 0);
                lastCol = 0;
                lastDir = "R";
            }
        } else if (0 <= row && row <= 49 && 100 <= col && col <= 149) {
            if (pointerDir == "T" && row == 0) {
                lastRow = 199;
                lastCol = 0 + (col - 100);
                lastDir = "T";
            } else if (pointerDir == "R" && col == 149) {
                lastRow = 149 - (row - 0);
                lastCol = 99;
                lastDir = "L";
            } else if (pointerDir == "D" && row == 49) {
                lastRow = 50 + (col - 100);
                lastCol = 99;
                lastDir = "L";
            }
        } else if (50 <= row && row <= 99 && 50 <= col && col <= 99) {
            if (pointerDir == "L" && col == 50) {
                lastRow = 100;
                lastCol = 0 + (row - 50);
                lastDir = "D";
            } else if (pointerDir == "R" && col == 99) {
                lastRow = 49;
                lastCol = 100 + (row - 50);
                lastDir = "T";
            }
        } else if (100 <= row && row <= 149 && 50 <= col && col <= 99) {
            if (pointerDir == "R" && col == 99) {
                lastRow = 49 - (row - 100);
                lastCol = 149;
                lastDir = "L";
            } else if (pointerDir == "D" && row == 149) {
                lastRow = 150 + (col - 50);
                lastCol = 49;
                lastDir = "L";
            }
        } else if (100 <= row && row <= 149 && 0 <= col && col <= 49) {
            if (pointerDir == "L" && col == 0) {
                lastRow = 49 - (row - 100);
                lastCol = 50;
                lastDir = "R";
            } else if (pointerDir == "T" && row == 100) {
                lastRow = 50 + (col - 0);
                lastCol = 50;
                lastDir = "R";
            }
        } else if (150 <= row && row <= 199 && 0 <= col && col <= 49) {
            if (pointerDir == "L" && col == 0) {
                lastRow = 0;
                lastCol = 50 + (row - 150);
                lastDir = "D";
            } else if (pointerDir == "D" && row == 199) {
                lastRow = 0;
                lastCol = 100 + (col - 0);
                lastDir = "D";
            } else if (pointerDir == "R" && col == 49) {
                lastRow = 149;
                lastCol = 50 + (row - 150);
                lastDir = "T";
            }
        }
    
        if (row === lastRow && col === lastCol) {
            if (pointerDir === "T") pointerRow--
            if (pointerDir === "R") pointerCol++
            if (pointerDir === "D") pointerRow++
            if (pointerDir === "L") pointerCol--
        } else {
            pointerRow = lastRow;
            pointerCol = lastCol;
            pointerDir = lastDir;
        }

        if (maze[pointerRow][pointerCol] !== " ")
            break
    } 
}

for (let direction of directions) {
    if (direction == "L") {
        if (dir === "T") dir = "L"
        else if (dir === "R") dir = "T"
        else if (dir === "D") dir = "R"
        else if (dir === "L") dir = "D"
    } else if (direction == "R") {
        if (dir === "T") dir = "R"
        else if (dir === "R") dir = "D"
        else if (dir === "D") dir = "L"
        else if (dir === "L") dir = "T"
    } else {
        let steps = +direction;
        while (steps > 0) {
            move();
            if (maze[pointerRow][pointerCol] == "#") {
                pointerRow = row;
                pointerCol = col;
                pointerDir = dir;
                break;
            } else {
                row = pointerRow;
                col = pointerCol;
                dir = pointerDir;
                steps--;
            }
        }
    }
}

console.log( (1000 * (row + 1)) + (4 * (col + 1)) + facingValue[dir]
);

