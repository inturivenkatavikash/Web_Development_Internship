// Week 4 — Connect 4 (Fixed & Enhanced)
// Fixes: added resetGame(), player card highlighting, winner piece animation

var playerPink  = "P";
var playerGreen = "G";
var currPlayer  = playerPink;
var gameOver    = false;
var board;
var rows        = 6;
var columns     = 7;
var currColumns = [];  // tracks next available row per column
var winningCells = []; // stores winning tile IDs

window.onload = function () {
    setGame();
    updatePlayerCards();
};

// ── Setup game board ─────────────────────────────────────
function setGame() {
    board       = [];
    currColumns = Array(columns).fill(rows - 1);
    winningCells = [];

    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardEl.appendChild(tile);
        }
        board.push(row);
    }
}

// ── Place a piece ─────────────────────────────────────────
function setPiece() {
    if (gameOver) return;

    let [, c] = this.id.split("-").map(Number);
    let r = currColumns[c];

    if (r < 0) return; // column is full

    board[r][c] = currPlayer;
    let tile = document.getElementById(`${r}-${c}`);
    tile.classList.add(currPlayer === playerPink ? "pink-piece" : "green-piece");

    currColumns[c]--;

    if (checkWinner()) {
        showWinner(r, c);
        return;
    }

    // Switch player and update UI
    currPlayer = currPlayer === playerPink ? playerGreen : playerPink;
    updatePlayerCards();
}

// ── Highlight active player card ──────────────────────────
function updatePlayerCards() {
    const cardPink  = document.getElementById("card-pink");
    const cardGreen = document.getElementById("card-green");
    if (!cardPink || !cardGreen) return;

    if (currPlayer === playerPink) {
        cardPink.classList.add("active-player");
        cardGreen.classList.remove("active-player");
    } else {
        cardGreen.classList.add("active-player");
        cardPink.classList.remove("active-player");
    }
}

// ── Check winner ──────────────────────────────────────────
function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] !== ' ') {
                const dirs = [
                    [0, 1],   // horizontal
                    [1, 0],   // vertical
                    [1, 1],   // diagonal ↘
                    [-1, 1],  // diagonal ↗
                ];
                for (let [dr, dc] of dirs) {
                    let cells = checkDirection(r, c, dr, dc);
                    if (cells) {
                        winningCells = cells;
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// Returns array of 4 winning [r,c] pairs or null
function checkDirection(r, c, rowDir, colDir) {
    let color = board[r][c];
    let cells = [[r, c]];
    for (let i = 1; i < 4; i++) {
        let nr = r + rowDir * i;
        let nc = c + colDir * i;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= columns || board[nr][nc] !== color) {
            return null;
        }
        cells.push([nr, nc]);
    }
    return cells;
}

// ── Show winner ───────────────────────────────────────────
function showWinner(r, c) {
    gameOver = true;

    // Animate winning cells
    winningCells.forEach(([wr, wc]) => {
        document.getElementById(`${wr}-${wc}`).classList.add("winning-piece");
    });

    const winner  = board[r][c] === playerPink ? "🌸 Pink" : "🌿 Green";
    const bannerEl = document.getElementById("winner-banner");
    const textEl   = document.getElementById("winner-text");

    if (textEl)   textEl.textContent = `${winner} wins! 🎉`;
    if (bannerEl) bannerEl.classList.remove("hidden");

    // Also hide old h2 if present
    const oldWinner = document.getElementById("winner");
    if (oldWinner) oldWinner.textContent = '';
}

// ── Reset game ────────────────────────────────────────────
function resetGame() {
    gameOver   = false;
    currPlayer = playerPink;
    winningCells = [];

    const bannerEl = document.getElementById("winner-banner");
    if (bannerEl) bannerEl.classList.add("hidden");

    setGame();
    updatePlayerCards();
}
