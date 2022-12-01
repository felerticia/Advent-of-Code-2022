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

    let maxElves = []

    for (const list of input){

        const caloriesSum = list.reduce((acc,calories) => acc+calories , 0) 

        if (maxElves.length < 3){
            maxElves.push (caloriesSum)
        } else {
            const min =  Math.min(...maxElves)
            if (caloriesSum > min) {
                maxElves[maxElves.indexOf(min)] = caloriesSum
            }
        }

    }   

    console.log (maxElves[0] + maxElves[1] + maxElves[2] )

})
