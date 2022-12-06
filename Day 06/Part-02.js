const fs = require ('fs')

const CHUNK_SIZE = 14

const findMarker = str => {
    for (let i = 0; i < str.length; i++) {
        const sub = str.substring(i,i+CHUNK_SIZE)
        if ([...new Set(sub)].length === CHUNK_SIZE)
            return i+CHUNK_SIZE
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

