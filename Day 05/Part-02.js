const fs = require ('fs')

const getCrates = input => {
    const rows = 
        input
            .filter(x => x.includes('['))
            .map (row => {
                const stack = []
                for (let i = 1; i < row.length; i+=4) {
                    stack.push(row[i])
                }
                return stack
            })
            .reverse()

    const ordered = []            
    for (let i=0; i< rows[0].length; i++) {
        const col = []
        for (let j=0; j<rows.length; j++) {
            if (rows[j][i] !== ' ')
            col.push(rows[j][i])
        }
        ordered.push(col)
    }

    return ordered
}

const extractInstruction = str => {
    const [,qty,,from,,to] = str.split(' ')
    return [Number(qty), Number(from), Number(to) ]
}

const getInstructions = input => {
    const instructions =
        input
        .filter (x => x.startsWith('move'))
        .map(extractInstruction)
    return instructions
}

const move = (crates,instruction) => {
    const [move,from,to] = instruction

    const chunk = crates[from-1].splice(crates[from-1].length-move , move)
    crates[to-1] = [...crates[to-1] , ...chunk]

    // for (let i=0; i<move; i++){
    //     crates[to-1].push(crates[from-1].pop())
    // }
    return crates
}

fs.readFile('input.txt', 'utf-8' , (err, data) => {
    const input = data.split('\n')

    let crates = getCrates(input)
    const instructions = getInstructions(input)
   
    for (const instruction of instructions)
        crates = move(crates,instruction)
   
    console.log (crates.map(x => x[x.length-1]).reduce((acc,x) => acc+x))
})

