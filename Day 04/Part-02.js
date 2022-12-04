const fs = require ('fs')

const divider = str => {
    return str
        .replace(/-/g, ',')
        .split(',')
        .map(Number)
}

const findOverlap = arr =>{
    const [low1,high1,low2,high2] = arr

    return (
        (low1 >= low2 && low1 <= high2) ||
        (low2 >= low1 && low2 <= high1)
    ) 

}

fs.readFile('input.txt', 'utf-8' , (err, data) => {

    const score = 
        data
            .split('\n')
            .map(divider)
            .filter(findOverlap)
            .length

    console.log(score)

})