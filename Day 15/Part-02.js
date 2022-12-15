const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err,data) => {
    const input = data.split('\n')

    const distance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

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

    //const Y = 2_000_000
    positiveLines = []
    negativeLines = []

    //const intervals = []

    for (let i = 0; i < sensors.length; i++) {
        const d = distances[i]
        negativeLines = [
            ...negativeLines,
            sensors[i][0] + sensors[i][1] - d, 
            sensors[i][0] + sensors[i][1] + d
        ] 
        positiveLines = [
            ...positiveLines,
            sensors[i][0] - sensors[i][1] - d, 
            sensors[i][0] - sensors[i][1] + d
        ] 
    
        // const dx =  distances[i] - Math.abs(sensors[i][1] - Y)
        // if (dx <= 0)
        //     continue

        // intervals.push([sensors[i][0] - dx, sensors[i][0] + dx])
    }

    let positive
    let negative

    for (let i = 0; i < 2 * sensors.length; i++) {
        for (let j = i+1; j < 2 * sensors.length; j++){
            let a = positiveLines[i]
            let b = positiveLines[j]

            if (Math.abs(a - b) == 2)
                positive = Math.min(a, b) + 1

            a = negativeLines[i]
            b = negativeLines[j]

            if (Math.abs(a - b) == 2)
                negative = Math.min(a, b) + 1
        }
    }


    let x = Math.floor((positive + negative) / 2)
    let y = Math.floor((negative - positive) / 2)
    let ans = x * 4000000 + y
    console.log(ans);

    // const allowed_x = []
    // for (const beacon of beacons){
    //     const [bx,by] = beacon
    //     if (by === Y)
    //         allowed_x.push(bx)
    // }

    // const min_x = Math.min(...intervals.map(x => x[0]))
    // const max_x = Math.max(...intervals.map(x => x[1]))

    // let ans = 0
    // for (let x = min_x; x <= max_x; x++) {
    
    //     if (allowed_x.includes(x))
    //         continue
    
    //     if (intervals.find(([left,right]) => left <= x && x <= right))
    //         ans += 1
        
    // }
    

})