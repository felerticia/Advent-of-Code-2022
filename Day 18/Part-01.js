const fs = require('fs')

const cubes = []

fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(row => {
        const [x, y, z] = row.split(',')
        cubes.push(`${x},${y},${z}`)
    });

const countFaces = (x, y, z) => {
    let count = 0;
    if (!cubes.includes(`${x+1},${y},${z}`)) count++;
    if (!cubes.includes(`${x-1},${y},${z}`)) count++;
    if (!cubes.includes(`${x},${y+1},${z}`)) count++;
    if (!cubes.includes(`${x},${y-1},${z}`)) count++;
    if (!cubes.includes(`${x},${y},${z+1}`)) count++;
    if (!cubes.includes(`${x},${y},${z-1}`)) count++;
  
    return count;
};

let area = 0;

for (const cube of cubes) {
    let [x, y, z] = cube.split(",").map(Number);
    area += countFaces(x, y, z);
}

console.log(area);
