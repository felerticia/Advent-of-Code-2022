const fs = require ('fs')

const findLetter = str => {
    const mid = str.length/2
    const leftChunk = str.slice(0,mid)
    const rightChunk = str.slice(mid)

    for (let i=0; i<rightChunk.length; i++){
        if (leftChunk.includes(rightChunk[i]))
            return rightChunk[i]
    }
}

const findValue = char => {
    const v = char.charCodeAt(0)
    if (v > 96) return v - 96
    if (v > 64) return v - 64 + 26

}

fs.readFile('input.txt', 'utf-8' , (err, data) => {


    const result =
        data
            .split('\n')
            .map(findLetter)
            .map(findValue)
            .reduce((acc,val) => acc+val , 0)

    console.log(result)
})