const fs = require ('fs')

const findLetter = arr => {
    for (let i=0; i<arr[0].length; i++){
        if (arr[1].includes(arr[0][i]) && arr[2].includes(arr[0][i] ))
            return arr[0][i]
    }
}

const findValue = char => {
    const v = char.charCodeAt(0)
    if (v > 96) return v - 96
    if (v > 64) return v - 64 + 26

}

const groupBy3 = (acc, v, i, arr) => {
    if (i % 3 !== 0) return acc   

    else
        acc = [...acc, [v, arr[i+1], arr[i+2]]]

    return acc
}

fs.readFile('input.txt', 'utf-8' , (err, data) => {


    const result =
        data
            .split('\n')
            .reduce(groupBy3,[])
            .map(findLetter)
            .map(findValue)
            .reduce((acc,val) => acc+val , 0)

    console.log(result)
})