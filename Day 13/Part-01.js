const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const parts = data.split('\n\n')

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

            if (i=== a.length) {
                if (a.length === b.length)
                    return 0
                return 1 // a has less
            }

            return -1
        }
    }

        


    let ans = 0

    for (let i = 0; i < parts.length; i++) {
        const p = parts[i].split('\n')
        const a = eval(p[0])
        const b = eval(p[1])

        if (compare(a, b) == 1)
            ans += i + 1
    }

    console.log(ans);

})