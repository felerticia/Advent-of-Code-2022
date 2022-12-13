const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = 
        data
            .replace("\n\n", "\n")
            .split('\n')
            .filter(x => x)

    const compare = (a, b) => {

        if(Array.isArray(a) && !Array.isArray(b))
            b = [b]

        if(!Array.isArray(a) && Array.isArray(b))
            a = [a]

        if(!Array.isArray(a) && !Array.isArray(b)){
            if (a < b)
                return 1
            if (a === b)
                return 0
            return -1
        }

        if(Array.isArray(a) && Array.isArray(b)){
            let i = 0
            while (i < a.length && i < b.length){
                const res = compare(a[i],b[i])
                if (res === 1 || res === -1)
                    return res
                i++
            }

            if (i === a.length) {
                if (a.length === b.length)
                    return 0
                return 1 // a has less
            }

            return -1
        }
    }

    let arrays = input.map(eval)   
    arrays.push([[2]])     
    arrays.push([[6]])     
    arrays = arrays.sort ((a,b) => compare(a,b)).reverse()

    let p,q
    for (let i = 0; i < arrays.length; i++) {
        const el = arrays[i]
        if (el.length === 1 && el[0].length === 1 && el[0][0] === 2)
            p = i + 1
        
        if (el.length === 1 && el[0].length === 1 && el[0][0] === 6)
            q = i + 1
    }

    console.log(p * q);

})