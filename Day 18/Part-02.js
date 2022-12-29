const fs = require('fs')

const cubes = []

fs.readFileSync( "input.txt", "utf8")
    .split('\n')
    .map(row => {
        const [x, y, z] = row.split(',')
        cubes.push(`${x},${y},${z}`)
    });

let min = Infinity;
let max = -Infinity;

for (let cube of cubes) {
    let [x, y, z] = cube.split(",").map((n) => parseInt(n));
    min = Math.min(min, x, y, z);
    max = Math.max(max, x, y, z);
}

const countAffectedCubes = (x, y, z) => {
    let count = 0;
    if (cubes.includes(`${x + 1},${y},${z}`)) count++;
    if (cubes.includes(`${x - 1},${y},${z}`)) count++;
    if (cubes.includes(`${x},${y + 1},${z}`)) count++;
    if (cubes.includes(`${x},${y - 1},${z}`)) count++;
    if (cubes.includes(`${x},${y},${z + 1}`)) count++;
    if (cubes.includes(`${x},${y},${z - 1}`)) count++;

    return count;
};

let visited = [];

let area = 0;
let queue = [{ x: 0, y: 0, z: 0 }];

while (queue.length > 0) {
    let { x, y, z } = queue.shift();
    const key = `${x},${y},${z}`
    if (visited.includes(key) || cubes.includes(key)) continue;
    if (x < min - 1 || y < min - 1 || z < min - 1 || x > max + 1 || y > max + 1 || z > max + 1) continue;
    visited.push(key);

    area += countAffectedCubes(x, y, z);

    queue.push({ x: x+1, y, z });
    queue.push({ x: x-1, y, z });
    queue.push({ x, y: y+1, z });
    queue.push({ x, y: y-1, z });
    queue.push({ x, y, z: z+1 });
    queue.push({ x, y, z: z-1 });
}

console.log(area);
