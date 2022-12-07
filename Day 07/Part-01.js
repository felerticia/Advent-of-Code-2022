const fs = require('fs')

let path = []   //  ['/']
let tree = {}   //  { '/' : ['a','b']}

const readBlock = (block) => {
    const lines = block.split('\n')
    const command = lines[0]
    const rest = lines.slice(1)

    if (command.startsWith('cd ')){
        // cd
        if (command.endsWith('..'))
            path.pop()
        else{
            path.push(command.split('cd ')[1])
        }
    }
    else {
        // ls
        let size = 0
        for (const line of rest) {
            if (!line.startsWith("dir")){
                size += Number(line.split(" ")[0])
            }
            else{
                const dir = line.split(" ")[1]
                const p =  path.join('/')
                if (tree[p]) {
                    tree[p].push('/' + dir)
                }
                else {
                    tree[p] = ['/' + dir]
                }
            }
        }

        if (tree[path.join('/')]){
            tree[path.join('/')].push(size)
        }
        else{
            tree[path.join('/')]=[size]
        }

    }


}

const directorySize = (item) => {
    if (!tree[item])
        return 0

    if (tree[item].length === 1)
        return tree[item][0]

    const news = 
        tree[item]
        .filter(x=> !Number(x))
        .map(e => directorySize(item+e))
        .reduce((acc,v) => acc+v)

    return news + tree[item][tree[item].length-1]
}

fs.readFile('input.txt', 'utf-8', (err,data) => {

    data
        .split('$ ')
        .filter(x => x)
        .map(readBlock)

    const total = Object
        .keys(tree)
        .map(directorySize)
        .filter(x => x <=100000)
        .reduce((acc,v) => acc+v)
    
    console.log(total)

})
