const fs = require('fs')

const toLeft = (input,row,col) => {
    let score = 0
    for (let i = col -1 ; i >= 0 ; i--) {
        if (input[row][i] >= input[row][col])
            return score + 1
        score++
    }    
    return score
}

const toRight = (input,row,col) => {
    let score = 0
    for (let i = col + 1; i < input[0].length ; i++) {
        if (input[row][i] >= input[row][col])
            return score + 1
        score++
    }    
    return score
}

const toUp = (input,row,col) => {
    let score = 0
    for (let i = row - 1; i >= 0 ; i--) {
        if (input[i][col] >= input[row][col])
            return score + 1
        score++
    }    
    return score
}

const toDown = (input,row,col) => {
    let score = 0
    for (let i = row + 1; i < input.length ; i++) {
        if (input[i][col] >= input[row][col])
            return score + 1
        score++
    }    
    return score
}

fs.readFile('input.txt', 'utf-8', (err,data) => {

    const input = data
        .split('\n')
        .map(row => row.split('').map(Number))

    let maxView = 0;
    const rows = input.length
    const cols = input[0].length
  
    for (let i = 1; i < rows-1; i++) {
        for (let j = 1; j < cols-1; j++) {
            const score = 
                toUp(input,i,j) *
                toRight(input,i,j) *
                toDown(input,i,j) *
                toLeft(input,i,j) 

            maxView = Math.max(maxView,score)
        }
    }

    console.log(maxView)

})
