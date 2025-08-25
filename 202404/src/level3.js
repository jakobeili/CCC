const fs = require("fs");

let path = process.argv[2]
let content;

try {
    content = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
} catch (error) {
    console.log("file not found ", path)
    process.exit(1)
}

let lines = content.split("\r\n");
let size = lines.shift();

for (let i = 1; i <= 3; i++) {
    boardSize = lines.shift()
    boardSize = boardSize.trim().split(" ")
    board = []
    for (let j = 0; j < boardSize[1]; j++) {
        board.push(lines.shift())
    }
    path = lines.shift()
    trees = getTrees(board)
    isValid = main(boardSize[0], boardSize[1], trees, path.trim())
    console.log(isValid)
    console.log()
}

function getTrees(board) {
    for (let x = 0; x < board[0].length; x++) {
        for (let y = 0; y < board.length; y++) {
            if ('X' == board[x][y]) {
                return [x, y]
            }
        }
    }
    return []
}



function main (width, height, tree, steps) {
    let isValid = true
    console.log(width, height, tree, steps)
    
    // 1. Size - trees == step count
    let area = (width * height) - 1
    let isSizeEqual = area == steps.length + 1
    /*if (!isSizeEqual) {
        return false
    }*/

    // 2. Get default path
    coord = [[0,0]]
    path = getPath(coord, path)
    console.log(path)


    // 2.1 check for size
    let size = getSizeOfPath(path)
    if (size[0] != width || size[1] != height) {
//        return false
    }
  
    // 2.2 check for duplicates
    let duplicates = checkPathForDuplicates(path)
    console.log(duplicates)
    if (duplicates) {
        //return false
    }

    
    
    // 3. Check each field 
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            path = getPath([[x,y]], steps)

            // 3.1 check tree
            let isTreeInPath = isTreeInPath(path, tree)
            

            // 3.2 check if in area
            console.log(getPath([[x,y]], steps))
        }
    }


    return isValid
}

function getPath(coord, path) {
    line = path.split('')  
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
    return coord
}


function getSizeOfPath(path) {
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
    return [width, height]
}

function checkPathForDuplicates(path) {
    for (let i = 0; i < path.length - 1; i++) {
        for (let j = i+1; j < path.length; j++) {
            if (path[i][0] == path[j][0] && path[i][1] == path[j][1]) {
                return true
            }
        }
    }
    return false
}

function isTreeInPath(path, tree) {
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] == tree[0] && path[i][1] == tree[1]) {
            return true
        }
    }
    return false
}
