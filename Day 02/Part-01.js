const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (er,data) => {

    const game = {
        'A X' : 3,
        'A Y' : 6,
        'A Z' : 0,
        'B X' : 0,
        'B Y' : 3,
        'B Z' : 6,
        'C X' : 6,
        'C Y' : 0,
        'C Z' : 3,
    }

    const result = {
        'X': 1,
        'Y': 2,
        'Z': 3,
    }
    
    const score = 
        data
            .split('\n')
            .reduce((score,round) => {
                score+= game[round]
                score+= result[round[2]]
                return score
            }, 0)
            
    
    console.log(score)

})