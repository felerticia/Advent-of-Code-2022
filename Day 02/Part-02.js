const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (er,data) => {

    const game = {
        'A X' : 3,
        'A Y' : 1,
        'A Z' : 2,
        'B X' : 1,
        'B Y' : 2,
        'B Z' : 3,
        'C X' : 2,
        'C Y' : 3,
        'C Z' : 1,
    }

    const result = {
        'X': 0,
        'Y': 3,
        'Z': 6,
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