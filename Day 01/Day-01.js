const fs = require('fs')


fs.readFile ('input.txt', 'utf-8', (err,data) => {

    const input = 
        data
            .split('\n')
            .map(Number)
            .reduce((acc,calories) =>{
                if(calories === 0) {
                    acc.push([])
                }
                else {
                    acc[acc.length-1].push(calories)
                }
                return acc
            },[[]])

    let maxElf = 0

    for (const list of input){

        const caloriesSum = list.reduce((acc,calories) => acc+calories , 0) 

        if (caloriesSum > maxElf)
            maxElf = caloriesSum

        }
        
        console.log (maxElf)

})
