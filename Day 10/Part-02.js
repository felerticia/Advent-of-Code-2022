const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n')
    
    let cur_X = 1
    let X = new Array(241).fill(1)
    let op = 0

   
    for (line of input){
    
        if (line.startsWith("noop")){
            op++
            X[op] = cur_X
        }
    
        else {
            X[op + 1] = cur_X
            cur_X += Number(line.split(" ")[1])

            op += 2
            X[op] = cur_X
        } 
    }
    

    const crtArray = new Array(40).fill('').map(x => new Array(6)) 

    for (let row = 0; row < 6; row++)
        for (let col = 0; col < 40; col++){
            const index = row * 40 + col + 1
            if (Math.abs(X[index - 1] - col) <= 1)
                crtArray[row][col] = "QQ"
            else
                crtArray[row][col] = "  "
        }

    for (let row of crtArray)
        console.log(row.join(''));

       
})