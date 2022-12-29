const fs = require("fs");


const input = fs.readFileSync( "input.txt", "utf8").split('\n')
  

const findDistance = (grid, start, end) => {
    const queue = [];
    const visited = [start];

    if (start == end) return [start];
    queue.push([start]);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        for (const neighbor of grid[node]) {
            if (visited.includes(neighbor)) continue;

            if (neighbor == end) return path.concat([neighbor]);
            visited.push(neighbor);
            queue.push(path.concat([neighbor]));
        }
    }

    return [];
}

const findRates = (distances, valve, minutes, left, opened = {}) => {
    let allRates = [opened];

    left.forEach((other, index) => {
        let leftMinutes = minutes - distances[valve][other] - 1;
        if (leftMinutes < 1) return;

        let newOpened = JSON.parse(JSON.stringify(opened));
        newOpened[other] = leftMinutes;

        let newLeft = [...left];
        newLeft.splice(index, 1);

        allRates.push(...findRates(distances, other, leftMinutes, newLeft, newOpened));
    });

    return allRates;
}


const graph = {}
const rates = {}

input.forEach(line => {
    let tokens = line.replace(/,/g, '').split(' ');

    graph[tokens[1]] = tokens.slice(9);
    rates[tokens[1]] = parseInt(tokens[4].replace(';', '').split('=')[1]);
});

const distances = {};
Object.keys(graph).forEach(start => {
    Object.keys(graph).forEach(end => {
        if (!distances[start]) 
            distances[start] = {};
        distances[start][end] = findDistance(graph, start, end).length - 1;
    });
});

const filteredValves = Object.keys(graph).filter(valve => rates[valve] != 0);
const allRates = findRates(distances, 'AA', 26, filteredValves);

const maxScores = {};
allRates.forEach(rate => {
    const key = Object.keys(rate).sort().join(',');
    const score = Object.entries(rate).reduce((acc, [key, value]) => acc + rates[key] * value, 0);

    if (!maxScores[key]) 
        maxScores[key] = -Infinity;
    maxScores[key] = Math.max(score, maxScores[key]);
});

let highest = -Infinity;
Object.keys(maxScores).forEach(human => {
    Object.keys(maxScores).forEach(elephant => {
        const allValves = new Set();
        const humanList = human.split(',');
        humanList.forEach(valve => allValves.add(valve));
        const elephantList = elephant.split(',');
        elephantList.forEach(valve => allValves.add(valve));

        if (allValves.size === (humanList.length + elephantList.length))
            highest = Math.max(maxScores[human] + maxScores[elephant], highest);
    });
});

console.log(highest)
