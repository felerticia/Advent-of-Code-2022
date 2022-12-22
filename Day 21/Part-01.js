const fs = require("fs");
const data = fs.readFileSync(`input.txt`, "utf-8");

const input = data.split("\n").map(s => s.split(": "));

const monkeys = new Map();

for(const [name, task] of input) {
    monkeys.set(name, task);
}

function monkeyNumber (monkey) {
    const [m1,op,m2] = monkeys.get(monkey).split(" ");
    if(!op) {
        return Number(m1);
    }
    return eval(`monkeyNumber(m1) ${op} monkeyNumber(m2)`);
}

console.log(monkeyNumber("root"));
