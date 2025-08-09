const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;

const KEY_CODES = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
};

const tileTypes = {
    EMPTY: 0,
    GRASS: 1,
    TREE: 2,
    ROCK: 3,
};

let map = [];
let player = {
    x: 10,
    y: 7,
    inventory: {
        wood: 0,
        stone: 0,
    },
};

function generateMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        let row = [];
        for (let x = 0; x < MAP_WIDTH; x++) {
            // Einfacher Zufall für Bäume & Steine
            let r = Math.random();
            if (r < 0.1) row.push(tileTypes.TREE);
            else if (r < 0.15) row.push(tileTypes.ROCK);
            else row.push(tileTypes.GRASS);
        }
        map.push(row);
    }
}

function drawMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            switch (map[y][x]) {
                case tileTypes.GRASS:
                    ctx.fillStyle = '#228B22'; // Grün
                    break;
                case tileTypes.TREE:
                    ctx.fillStyle = '#654321'; // Braun
                    break;
                case tileTypes.ROCK:
                    ctx.fillStyle = '#808080'; // Grau
                    break;
                default:
                    ctx.fillStyle = '#000';
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = '#FFD700'; // Gelb
    ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawInventory() {
    ctx.fillStyle = '#eee';
    ctx.font = '16px monospace';
    ctx.fillText(`Holz: ${player.inventory.wood}`, 10, canvas.height - 30);
    ctx.fillText(`Stein: ${player.inventory.stone}`, 10, canvas.height - 10);
}

function canMove(x, y) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false;
    if (map[y][x] === tileTypes.TREE || map[y][x] === tileTypes.ROCK) return false;
    return true;
}

function movePlayer(dx, dy) {
    let nx = player.x + dx;
    let ny = player.y + dy;

    if (canMove(nx, ny)) {
        player.x = nx;
        player.y = ny;
    } else {
        // Versuch, Ressourcen abzubauen
        let targetTile = map[ny]?.[nx];
        if (targetTile === tileTypes.TREE) {
            player.inventory.wood++;
            map[ny][nx] = tileTypes.GRASS;
        } else if (targetTile === tileTypes.ROCK) {
            player.inventory.stone++;
            map[ny][nx] = tileTypes.GRASS;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    drawInventory();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case KEY_CODES.LEFT:
            movePlayer(-1, 0);
            break;
        case KEY_CODES.RIGHT:
            movePlayer(1, 0);
            break;
        case KEY_CODES.UP:
            movePlayer(0, -1);
            break;
        case KEY_CODES.DOWN:
            movePlayer(0, 1);
            break;
    }
});

generateMap();
gameLoop();
