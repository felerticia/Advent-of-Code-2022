const fs = require('fs')

const toLeft = (input,row,col) => {
    for (let i = 0; i < col ; i++) {
        if (input[row][i] >= input[row][col])
            return 0
    }    
    return 1
}

const toRight = (input,row,col) => {
    for (let i = col + 1; i < input[0].length ; i++) {
        if (input[row][i] >= input[row][col])
            return 0
    }    
    return 1
}

const toUp = (input,row,col) => {
    for (let i = 0; i < row ; i++) {
        if (input[i][col] >= input[row][col])
            return 0
    }    
    return 1
}

const toDown = (input,row,col) => {
    for (let i = row + 1; i < input.length ; i++) {
        if (input[i][col] >= input[row][col])
            return 0
    }    
    return 1
}

fs.readFile('input.txt', 'utf-8', (err,data) => {

    const input = data
        .split('\n')
        .map(row => row.split('').map(Number))

    let count = 0;
    const rows = input.length
    const cols = input[0].length
   
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === 0 || i === rows-1 || j === 0 || j === cols-1){
                count++;
            }
            else {
                count += 
                toUp(input,i,j) ||
                toDown(input,i,j) ||
                toRight(input,i,j) ||
                toLeft(input,i,j)
            }
            
        }
    }

   console.log(count);
})
