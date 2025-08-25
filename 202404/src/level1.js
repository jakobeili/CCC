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
    let map = new Map();
    map.set("W", 0)
    map.set("D", 0)
    map.set("A", 0)
    map.set("S", 0)
    line = lines[i].trim().split('')  
    for (let j = 0; j < line.length; j++) {
            let current = map.get(line[j])
            map.set(line[j], ++current)
    }
    output(map)
}


function output(map) {
    process.stdout.write(map.get('W') + " " + map.get('D') + " " + map.get('S') + " " +map.get('A') + "\n")
}




