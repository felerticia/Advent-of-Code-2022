const fs = require("fs");
const data = fs.readFileSync(`input.txt`, "utf-8");

const input = data.split("\n").map(s => s.split(": "));

const monkeys = new Map();

for(const [name, task] of input) {
    monkeys.set(name, task);
}

const [leftMonkey,,rightMonkey] = monkeys.get("root").split(" ");

if(isConnected(leftMonkey)) {
    console.log(
        humanNumber(leftMonkey, 
        monkeyNumber(rightMonkey)
    ));
}
else {
    console.log(
        humanNumber(rightMonkey, 
        monkeyNumber(leftMonkey)
    ));
}

function isConnected(monkey) {
    const [m1,op,m2] = monkeys.get(monkey).split(" ");
    // is a number
    if (!op) return false;
    if(m1 === "humn" || m2 === "humn") return true;
    return isConnected(m1) || isConnected(m2);
}

function humanNumber(monkey, value) {
    let [left,op,right] = monkeys.get(monkey).split(" ");

    let operand
    if (left === "humn") operand = right
    if (right === "humn") operand = left

    if (operand){
        if (op === "+")
            return value - monkeyNumber(operand);
        if (op === "*")
            return value / monkeyNumber(operand);
        if (op === "-")
            return monkeyNumber(operand) + operand === right ? value : -value;
        if (op === "/")
            return monkeyNumber(operand) * operand === right ? value : 1/value;
    }

    const isLeftConnected = !!isConnected(left)

    if(!isLeftConnected){
        [left,right] = [right,left]
    }

    if(op === "+") {
        return humanNumber(left, value - monkeyNumber(right));
    }
    if(op === "*") {
        return humanNumber(left, value / monkeyNumber(right));
    }
    else if(op === "-") {
        return humanNumber(left, monkeyNumber(right) + (isLeftConnected ? value : -value) );
    }
    else if(op === "/") {
        return humanNumber(left, monkeyNumber(right) * (isLeftConnected ? value : 1/value) );
    }
    

}

function monkeyNumber (monkey) {
    const [m1,op,m2] = monkeys.get(monkey).split(" ");
    if(!op) {
        return Number(m1);
    }

    return eval(`monkeyNumber(m1) ${op} monkeyNumber(m2)`);
}