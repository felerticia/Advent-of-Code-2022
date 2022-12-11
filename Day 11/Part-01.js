const fs = require('fs')

const isDivisible = (item,test) => item % test === 0

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n\n')
    const monkeys = [];

    for (let monkeyData of input) {
        const lines = monkeyData.split('\n')
        const items = lines[1].split("Starting items: ")[1].split(", ").map(Number)
        const op = lines[2].split("Operation: new = old ")[1].split(" ")
        const test = Number(lines[3].split("Test: divisible by ")[1])
        const ifTrue = Number(lines[4].split("If true: throw to monkey ")[1])
        const ifFalse =  Number(lines[5].split("If false: throw to monkey ")[1])
        monkeys.push({
            items,
            op,
            test,
            ifTrue,
            ifFalse,
            tested: 0
        })
    }

    for (let i = 1; i <= 20; i++) {
        monkeys.forEach(monkey => {
            for (item of monkey.items){
                if (monkey.op[0]==='*')
                    item = item * (Number(monkey.op[1]) || item)
                else
                    item = item + Number(monkey.op[1])

                item = Math.floor(item/3)

                if (isDivisible(item,monkey.test))
                    monkeys[monkey.ifTrue].items.push(item)
                else
                    monkeys[monkey.ifFalse].items.push(item)

                monkey.tested += monkey.items.length
                monkey.items = []
            }
        })
    }

    const best = monkeys.map(x => x.tested).sort((a,b) => a > b ? -1 : 1)


    console.log(best);
    console.log(best[0] * best[1]);

})