const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const rocks = [
  [ [0, 0],[1, 0],[2, 0],[3, 0] ],
  [ [1, 0],[0, 1],[1, 1],[2, 1],[1, 2] ],
  [ [2, 0],[2, 1],[0, 2],[1, 2],[2, 2] ],
  [ [0, 0],[0, 1],[0, 2],[0, 3] ],
  [ [0, 0],[1, 0],[0, 1],[1, 1] ],
];

const jets = input.split("").map(x => x === "<" ? -1 : 1);

const arenaWidth = 7;
let  arena = [];

const target = 1000000000000;
let restingRocks = 0;

let jIndex = 0;
let offset = 0;
const repeatForm = [{ rock: 0, jet: 0, height: 0, rest: 0 }];

while (restingRocks < target) {
  const rock = createRock(arena, rocks[restingRocks % rocks.length]);
  let atRest = false;
  while (!atRest) {
    const blow = jets[jIndex % jets.length];

    if (rock.every(([x, y]) => arena[y][x + blow] !== undefined && !arena[y][x + blow])) {
      move(rock, blow, 0);
    }

    if (rock.every(([x, y]) => y - 1 > -1 && !arena[y - 1][x])) {
      move(rock, 0, -1);
    } else {
      atRest = true;
    }

    jIndex += 1;
  }

  for (const [x, y] of rock) {
    arena[y][x] = true;
  }

  restingRocks++;

  let newBlockingGround = -1;
  for (let i = arena.length - 1; i > 0; i--) {
    if (arena[i].some(x => x)) {
      if (arena[i].every(x => x)) {
        newBlockingGround = i;
      }
      break;
    }
  }

  if (newBlockingGround !== -1) {
    const nextRock = restingRocks % rocks.length;
    const nextJet = jIndex % jets.length;
    const previous = repeatForm.find(
      ({ rock, jet }) => rock === nextRock && jet === nextJet
    );
    if (previous) {
      const heightPerLoop = getHeight(arena) - previous.height;
      const rocksPerLoop = restingRocks - previous.rest;
      const loops = Math.floor((target - restingRocks) / rocksPerLoop);
      restingRocks += loops * rocksPerLoop;
      offset += loops * heightPerLoop;
    } else {
      arena = [];
      offset = newBlockingGround + 1;
      repeatForm.push({
        rock: nextRock,
        jet: nextJet,
        height: newBlockingGround + 1,
        rest: restingRocks,
      });
    }
  }
}

const result = getHeight(arena);
function getHeight(arena) {
    for (let i = arena.length - 1; i > 0; i--) {
      if (arena[i].some((x) => x)) {
        return i + 1 + offset;
      }
    }
  
    return 0;
}

function move(rock, dx, dy) {
  for (const pos of rock) {
    pos[0] += dx;
    pos[1] += dy;
  }
}

function createRock(arena, shape) {
    let peak = arena.findIndex(row => row.every(x => !x));
    if (peak !== -1) {
      peak --;
    }
  
  const rockHeight = Math.max(...shape.map(([, y]) => y)) + 1;
  const bornHeight = peak + rockHeight + 3;
  const newRows = bornHeight - arena.length + 1;
  for (let i = 0; i < newRows; i++) {
    arena.push(Array(arenaWidth).fill(false));
  }

  return shape.map(([x, y]) => [x + 2, bornHeight - y]);
}


console.log(result);
