const fs = require("fs");

const input = fs.readFileSync('input.txt','utf-8').split('\n').map(x => x.trim())

const dic = {
    '2' : 2,
    '1' : 1,
    '0' : 0,
    '-' : -1,
    '=' : -2,
}

const getKey = val => Object.keys(dic).find(key => dic[key] === val )

const getDecimal = num => 
    num
        .split('')
        .reduce((acc, val, i) => 
            acc += dic[val] * Math.pow(5, num.length -i -1), 0)

const sum = input.reduce((acc,val) => acc + getDecimal(val),0)

const getSNAFU = num => {
    let rem = num % 5;
    if (rem > 2)
        rem -=5
    const div = (num-rem) / 5

    if (div < 3)
        return div + '' + getKey(rem)

    else return getSNAFU(div) + '' + getKey(rem)
}

console.log(getSNAFU(sum))


