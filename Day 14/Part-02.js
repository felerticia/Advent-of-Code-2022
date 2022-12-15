const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const lines = data.split('\n')

    const filled = new Set()
    
    for (let line of lines){
        const coords = []

        for (let str_coord of line.split(" -> ")){
            const [x, y] = str_coord.split(",").map(Number)
            coords.push([x,y])
        }
    
        for (let i = 1; i < coords.length; i++) {
            const [cx, cy] = coords[i]
            const [px, py] = coords[i - 1]

            if (cy !== py){
                for (let y = Math.min(cy, py); y <= Math.max(cy, py); y++) {
                    filled.add(`${cx}:${y}`)
                }
            }

            if (cx !== px){
                for (let x = Math.min(cx, px); x <= Math.max(cx, px); x++) {
                    filled.add(`${x}:${cy}`)
                }
            }
            
        }
    }

    const max_y = Math.max(...[...filled].map(x => Number(x.split(':')[1])))
    const simulate_sand =() => {
        let [x, y] = [500,0]

        if (filled.has(`${x}:${y}`))
            return [x,y]

        while (y <= max_y){
            if (!filled.has(`${x}:${y+1}`)){
                y++
                continue
            }
            if (!filled.has(`${x-1}:${y+1}`)){
                x--
                y++
                continue
            }
            if (!filled.has(`${x+1}:${y+1}`)){
                x++
                y++
                continue
            }

            break
        }

        return [x,y]
    }

    let ans = 0

    while (true){
        const [x,y] = simulate_sand()
        filled.add(`${x}:${y}`)
        ans += 1

        if (x === 500 & y === 0)
            break

    }
        
    console.log(ans);

})