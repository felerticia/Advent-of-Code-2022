const fs = require('fs')

const knots = new Array(10).fill('').map(x => [0,0])
const path = {'0_0': true}

const moveHead = dir => {
    const head = knots[0]

    if (dir === 'R')
        head[1]++
    if (dir === 'L')
        head[1]--
    if (dir === 'U')
        head[0]--
    if (dir === 'D')
        head[0]++
}

const updateKnot = knot => {
    const head = knots[knot-1]
    const tail = knots[knot]
    
    if (Math.abs(head[0]-tail[0]) === 2 && head[1]===tail[1]) {
        tail[0] += Math.floor((head[0]-tail[0])/2)
    }

    else if (Math.abs(head[1]-tail[1]) === 2 && head[0]===tail[0]) {
        tail[1] += Math.floor((head[1]-tail[1])/2)
    }

    else if (Math.abs(head[0]-tail[0]) > 1 || Math.abs(head[1]-tail[1]) > 1) {
        tail[0] += Math.floor((head[0]-tail[0]) / Math.abs(head[0]-tail[0]))
        tail[1] += Math.floor((head[1]-tail[1]) / Math.abs(head[1]-tail[1]))
    }
}

const updatePath = () => {
    path[`${knots[9][0]}_${knots[9][1]}`] = true
}

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n')

    .map(row => row.split(' '))

    for (const walk of input){
        const [dir,steps] = [walk[0], Number(walk[1])]
        for (let step = 0; step < steps; step++) {
            moveHead(dir)
            for (let knot = 1; knot < 10; knot++) {
                updateKnot(knot)
                updatePath()
            }
        }
    }

    console.log(Object.keys(path).length);
})