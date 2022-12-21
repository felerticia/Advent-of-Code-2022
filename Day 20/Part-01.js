const fs = require("fs");
const data = fs.readFileSync(`./input.txt`, "utf-8");
const input = data.split("\n");

const numbers = input.map(x => +x);
const list = input.map((x, i) => ({num: x, id: i}));

for(let i = 0; i < numbers.length; i++) {
    const id = list.findIndex(x => x.id === i);
    list.splice(id, 1);
    list.splice((numbers[i] + id) % list.length, 0, {num: numbers[i], id: i});
}

const zeroId = list.findIndex(x => x.num === 0);
const positions = [1000, 2000, 3000]
const sum = positions.reduce((acc, val) => acc + list[(val + zeroId) % list.length].num, 0)

console.log(sum);