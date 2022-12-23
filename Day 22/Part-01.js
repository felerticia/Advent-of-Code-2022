const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\n\n')

const maze = input[0].split('\n').map(row => row.split(""))
const directions = input[1].match(/\d+|(L|R)/g)

const maxRows = maze.length
const maxCols = maze[0].length

let row = 0
let col = maze[0][0].indexOf('.');
let dir = "R"

let pointerRow = 0
let pointerCol = col
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
        if (pointerDir === "T") pointerRow--
        if (pointerDir === "R") pointerCol++
        if (pointerDir === "D") pointerRow++
        if (pointerDir === "L") pointerCol--

        // reset back in to the maze if falling out
        if (pointerRow > maxRows - 1) pointerRow = 0;
        if (pointerRow < 0) pointerRow = maxRows - 1;    
        if (pointerCol > maxCols - 1) pointerCol = 0;
        if (pointerCol < 0) pointerCol = maxCols - 1;
    
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
            if (maze[pointerRow][pointerCol] === "#") {
                pointerRow = row
                pointerCol = col
                pointerDir = dir
                break;
            } else {
                row = pointerRow
                col = pointerCol
                dir = pointerDir
                steps--
            }
        }
    }
}

console.log((1000 * (row + 1)) + (4 * (col + 1)) + facingValue[dir])

