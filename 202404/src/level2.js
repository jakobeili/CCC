const fs = require("fs");

let path = process.argv[2]
//let path = "/home/dominik/personal/ccc/202404/input/level1/level1_example.in";
let content;

try {
    content = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
} catch (error) {
    console.log("file not found ", path)
    process.exit(1)
}

let lines = content.split("\r\n");
let size = lines[0]

for (let i = 1; i <= size; i++) {
    line = lines[i].trim().split('')  
    coord = [[0,0]]
    for (let j = 0; j <= line.length; j++) {
        temp = []
        temp[0] = coord[coord.length - 1][0]
        temp[1] = coord[coord.length - 1][1]
        switch (line[j]) {
            case 'W':     
                temp[1] += 1
                coord.push(temp)
                break;
            case 'S':
                temp[1] -= 1
                coord.push(temp)
                break;
            case 'A':
                temp[0] -= 1
                coord.push(temp)
                break;
            case 'D':
                temp[0] += 1
                coord.push(temp)
                break;
        }
    }

    let minX = 0
    let maxX = 0
    let minY = 0
    let maxY = 0

    for (let j = 0; j < coord.length; j++) {
        if (coord[j][0] < minX) {
            minX = coord[j][0]
        }
        if (coord[j][0] > maxX) {
            maxX = coord[j][0]
        }
        if (coord[j][1] < minY) {
            minY = coord[j][1]
        }
        if (coord[j][1] > maxY) {
            maxY = coord[j][1]
        }
    }
    let width = Math.abs(minX) + Math.abs(maxX) + 1;
    let height = Math.abs(minY) + Math.abs(maxY) + 1;
    console.log(width, height)
}


function output(map) {
    let height = Math.max(map.get("W"), map.get("S"))
    let width = Math.max(map.get("A"), map.get("D"))
    console.log("A:", map.get('A'), "D:", map.get('D'), "W:", map.get('W'), "S:", map.get('S'))
    console.log(width + " " + height) 
}




