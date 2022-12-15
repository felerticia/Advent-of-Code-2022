const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n')

    const distance = (x, y) => Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1])

    const sensors = []
    const beacons = []

    for (const line of input) {
        const parts = line.split(" ")

        const sensorX = Number(parts[2].slice(2,-1))
        const sensorY = Number(parts[3].slice(2,-1))
        const beaconX = Number(parts[8].slice(2,-1))
        const beaconY = Number(parts[9].slice(2))
    
        sensors.push([sensorX, sensorY])
        beacons.push([beaconX, beaconY])
    }
    
    const distances = []

    for (let i = 0; i < sensors.length; i++) {
        distances.push(distance(sensors[i], beacons[i]))
    }

    const Y = 2_000_000

    const intervals = []

    for (let i = 0; i < sensors.length; i++) {
        const dx =  distances[i] - Math.abs(sensors[i][1] - Y)
        if (dx <= 0)
            continue

        intervals.push([sensors[i][0] - dx, sensors[i][0] + dx])
    }

    const allowed_x = []
    for (const beacon of beacons){
        const [bx,by] = beacon
        if (by === Y)
            allowed_x.push(bx)
    }

    const min_x = Math.min(...intervals.map(x => x[0]))
    const max_x = Math.max(...intervals.map(x => x[1]))

    let result = 0
    for (let x = min_x; x <= max_x; x++) {
    
        if (allowed_x.includes(x))
            continue
    
        if (intervals.find(([l,r]) => l <= x && x <= r))
            result++
        
    }
    
    console.log(result);

})