const MAX_X = 10;
const MAX_Y = 10;

let cells = {};

function createCells() {
    for (let i = 0; i < MAX_X; i++) {
        for (let j = 0; j < MAX_Y; j++) {
            cells[`${i}${j}`] = new Cell(i, j);
        }
    }
}

function makeTable() {
    const table = document.createElement('table');
    table.style.marginLeft = 'auto';
    table.style.marginRight = 'auto';
    for (let i = 0; i < MAX_X; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < MAX_Y; j++) {
            let cell = document.createElement('td');
            let id = `${i}${j}`;
            cell.id = id;
            cell.innerText = id;
            setBorder(cell, i, j);
            row.append(cell);
        }
        table.append(row);
    }
    document.getElementById('app').append(table);
}

/**
 * 
 * @param {HTMLTableCellElement} cell 
 * @param {int} x 
 * @param {int} y 
 */
function setBorder(cell, x, y) {
    if (x === 0) {
        cell.style.borderTop = 'solid black';
    }

    if (y === 0) {
        cell.style.borderLeft = 'solid black';
    }

    if (x === 9) {
        cell.style.borderBottom = 'solid black';
    }

    if (y === 9) {
        cell.style.borderRight = 'solid black';
    }
}

class Cell {
    constructor(x, y) {
        this.visited = false;
        this.x = x;
        this.y = y;
        this.id = `${x}${y}`;
        this.neighbours = [];
    }

    getUnvisitedNeighbour() {
        let unvisitedNeighbours = this.neighbours.filter(id => !cells[id].visited);
        let randomNeighbour = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];

        return unvisitedNeighbours.length ? cells[randomNeighbour] : null;
    }

    drawWalls() {
        document.getElementById(this.id).style.backgroundColor = 'yellow';

        if (cells.hasOwnProperty(`${this.x}${this.y - 1}`)) {
            if (!cells[`${this.x}${this.y - 1}`].visited) {
                document.getElementById(this.id).style.borderLeft = 'solid black';
            } else {
                document.getElementById(`${this.x}${this.y - 1}`).style.borderRight = 'none';
            }
        }
        if (cells.hasOwnProperty(`${this.x + 1}${this.y}`)) {
            if (!cells[`${this.x + 1}${this.y}`].visited) {
                document.getElementById(this.id).style.borderBottom = 'solid black';
            } else {
                document.getElementById(`${this.x + 1}${this.y}`).style.borderTop = 'none';
            }
        }
        if (cells.hasOwnProperty(`${this.x}${this.y + 1}`)) {
            if (!cells[`${this.x}${this.y + 1}`].visited) {
                document.getElementById(this.id).style.borderRight = 'solid black';
            } else {
                document.getElementById(`${this.x}${this.y + 1}`).style.borderLeft = 'none';
            }
        }
        if (cells.hasOwnProperty(`${this.x - 1}${this.y}`)) {
            if (!cells[`${this.x - 1}${this.y}`].visited) {
                document.getElementById(this.id).style.borderTop = 'solid black';
            } else {
                document.getElementById(`${this.x - 1}${this.y}`).style.borderBottom = 'none';
            }
        }
    }
}


function setupNeighbours() {
    for (cellId in cells) {
        let cell = cells[cellId];
        if (cells.hasOwnProperty(`${cell.x}${cell.y - 1}`)) {
            cell.neighbours.push(`${cell.x}${cell.y - 1}`);
        }
        if (cells.hasOwnProperty(`${cell.x + 1}${cell.y}`)) {
            cell.neighbours.push(`${cell.x + 1}${cell.y}`);
        }
        if (cells.hasOwnProperty(`${cell.x}${cell.y + 1}`)) {
            cell.neighbours.push(`${cell.x}${cell.y + 1}`);
        }
        if (cells.hasOwnProperty(`${cell.x - 1}${cell.y}`)) {
            cell.neighbours.push(`${cell.x - 1}${cell.y}`);
        }
    }
}

function drawMaze(cell) {
    cell.visited = true;
    cell.drawWalls();
    
    if (newCell = cell.getUnvisitedNeighbour()) {
        drawMaze(newCell);
    }
}

makeTable();
createCells();
setupNeighbours();
drawMaze(cells['00']);
