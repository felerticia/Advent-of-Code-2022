const fs = require ('fs')

const BUFFER_SIZE = 14

const findMarker = str => {
    for (let i = 0; i < str.length; i++) {
        const sub = str.substring(i,i+BUFFER_SIZE)
        if ([...new Set(sub)].length === BUFFER_SIZE)
            return i+BUFFER_SIZE
    }
}

const reducer = (acc,value) => acc+value

fs.readFile('input.txt', 'utf-8' , (err, data) => {

    const result = 
        data
            .split('\n')
            .map(findMarker)
            .reduce(reducer,0)


    console.log(result)
})

