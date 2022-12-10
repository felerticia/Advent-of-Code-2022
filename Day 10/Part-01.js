const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n')
    
    let X = 1
    let op = 0
    
    let signalStrength = 0
    const cycles = [20, 60, 100, 140, 180, 220]
    
    for (line of input){
    
        if (line.startsWith("noop")){
            op ++
            if (cycles.includes(op))
                signalStrength += op * X
        }
    
        else {
            op ++
            if (cycles.includes(op))
                signalStrength += op * X
    
            op ++
            if (cycles.includes(op))
                signalStrength += op * X

            X += Number(line.split(" ")[1])
        } 
    }
    
    
    console.log(signalStrength)

       
})