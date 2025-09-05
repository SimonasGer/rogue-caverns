const map = document.getElementById("map");
const width = 50;
const height = 20;

for (let i = 0; i < width; i++) {
    let row = document.createElement("div");
    map.appendChild(row);
    for (let j = 0; j < height; j++) {
        let column = document.createElement("div");
        column.style.border = "solid";
        column.style.borderWidth = "1px";
        column.style.width = "25px";
        column.style.height = "25px";
        column.id = `${i}-${j}`;
        column.classList.add("cell");
        if (Math.random() < 0.55) {
            column.classList.add("wall");
        }
        if ((i == 0 || i == width - 1 || j == 0 || j == height - 1) && !column.classList.contains("wall")) {
            column.classList.add("wall");
        }
        row.appendChild(column);        
    }
}

const allTiles = document.getElementsByClassName("cell");

for (let i = 0; i < 5; i++) {
    let toAdd = [];
    let toRemove = [];
    for (let j = 0; j < allTiles.length; j++) {
        let neighbors = 0;    
        tileId = allTiles[j].id.split("-");
        let x = Number(tileId[0]);
        let y = Number(tileId[1]);
        let thisTile = document.getElementById(`${x}-${y}`);

        for (let hor = -1; hor <= 1; hor++) {
            for (let vert = -1; vert <= 1; vert++) {
                if (hor == 0 && vert == 0) continue;
                if (!document.getElementById(`${x + hor}-${y + vert}`)) {
                    neighbors++
                    continue;
                }
                if (document.getElementById(`${x + hor}-${y + vert}`).classList.contains("wall")) {
                    neighbors++;
                }
            }
        }
        if (neighbors >= 5 && !thisTile.classList.contains("wall")) {
            toAdd.push(thisTile);
        }
        else if (neighbors < 5 && thisTile.classList.contains("wall")) {
            toRemove.push(thisTile);
        }
    }
    toAdd.forEach(c => c.classList.add("wall"));
    toRemove.forEach(c => c.classList.remove("wall"));
}

let areas = [];


const floodCount = (x, y, area) => {
    let cell = document.getElementById(`${x}-${y}`);
    if (!cell) return;
    if (cell.classList.contains("wall")) return;
    if (area.includes(cell)) return;
    area.push(cell)
    floodCount(x - 1, y, area);
    floodCount(x + 1, y, area);
    floodCount(x, y - 1, area);
    floodCount(x, y + 1, area);
}

for (let i = 0; i < allTiles.length; i++) {
    let cell = allTiles[i];
    if (cell.classList.contains("wall")) continue;
    let counted = false;
    for (let j = 0; j < areas.length; j++) {
        if (areas[j].includes(cell)) {
            counted = true;
            break;
        }
    }
    if (!counted) {
        let newArea = [];
        let cellId = cell.id.split("-");
        let x = Number(cellId[0]);
        let y = Number(cellId[1]);
        floodCount(x, y, newArea);
        areas.push(newArea);
    }
}

let largest = 0;

for (let i = 0; i < areas.length; i++) {
    if (areas[largest].length < areas[i].length) largest = i;
}

for (let i = 0; i < areas.length; i++) {
    if (i == largest) continue;
    let area = areas[i];
    for (let j = 0; j < area.length; j++) {
        area[j].classList.add("wall");        
    }
}
