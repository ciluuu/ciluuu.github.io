---
layout: default
title: sudoku extrême
permalink: /sudoku-un-peu-dur-hihi/
---


<h1>sudoku super méga dur</h1>
<p>bon courage... tu vas en avoir besoin</p>


<style>
body {
    background: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
}

h1 {
    color: #ffffff;
    margin-bottom: 15px;
    font-size: 2em;
}

p {
    color: #cccccc;
    font-size: 1.1em;
    margin-bottom: 25px;
}

header h1 a,
header h1 a:link,
header h1 a:visited,
header h1 a:active {
    color: #eb2cbb !important;
    text-decoration: none;
}

header h1 a:hover {
    color: #fd70f4 !important;
}

#sudoku-container {
    background: #1b1b1b;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 0 10px #0008;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#sudoku {
    display: grid;
    grid-template-columns: repeat(9, 50px);
    gap: 0;
    margin-top: 10px;
}

.sudoku-cell {
    width: 50px;
    height: 50px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    border: 1px solid #333;
    background: #1b1b1b;
    color: #e0e0e0;
    outline: none;
    box-sizing: border-box;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    position: relative;
}

.sudoku-cell:focus {
    background: #2a2a2a;
    color: #fd70f4;
    z-index: 10;
}

.sudoku-cell.prefilled {
    background: #252525;
    color: #fd70f4;
    font-weight: bold;
    cursor: default;
    user-select: none;
    caret-color: transparent;
}

.sudoku-cell.same-value {
    background: #43324a;
    color: #eb2cbbff;
}

.sudoku-cell.locked {
    pointer-events: auto;
}

.sudoku-cell.active {
    background: #35223a;
}

.sudoku-cell.highlight-block {
    background: #252125;
}

.sudoku-cell[data-row="0"],
.sudoku-cell[data-row="3"],
.sudoku-cell[data-row="6"] {
    border-top: 2px solid #666;
}

.sudoku-cell[data-row="8"] {
    border-bottom: 2px solid #666;
}

.sudoku-cell[data-col="0"],
.sudoku-cell[data-col="3"],
.sudoku-cell[data-col="6"] {
    border-left: 2px solid #666;
}

.sudoku-cell[data-col="8"] {
    border-right: 2px solid #666;
}

.sudoku-cell[data-row="2"],
.sudoku-cell[data-row="5"] {
    border-bottom: 2px solid #666;
}

.sudoku-cell[data-col="2"],
.sudoku-cell[data-col="5"] {
    border-right: 2px solid #666;
}

#checkButton {
    padding: 12px 25px;
    background: #fd70f4;
    color: #121212;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    transition: 0.2s;
}

#checkButton:hover {
    background: #eb2cbbff;
}

#feedback {
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 8px;
    text-align: center;
    min-height: 20px;
}

#feedback.correct {
    background: #fd70f4;
    color: #121212;
}

#feedback.wrong {
    background: #d11975db;
    color: #121212;
}
</style>


<div id="sudoku-container">
    <div id="sudoku"></div>
    <div id="controls" style="display: flex; gap: 15px; margin-top: 20px;">
        <button id="checkButton">vérifier</button>
        <button id="hintButton">utiliser un indice</button>
    </div>
    <div id="hints" style="margin-top: 15px; color: #ff4ca2ff; font-size: 14px;"></div>
    <div id="feedback"></div>
</div>


<script>
const solution = [
  [1,4,5,3,2,7,6,9,8],
  [8,3,9,6,5,4,1,2,7],
  [6,7,2,9,1,8,5,4,3],
  [4,9,6,1,8,5,3,7,2],
  [2,1,8,4,7,3,9,5,6],
  [7,5,3,2,9,6,4,8,1],
  [3,6,7,5,4,2,8,1,9],
  [9,8,4,7,6,1,2,3,5],
  [5,2,1,8,3,9,7,6,4]
];

const puzzle = [
  [0,0,5,3,0,0,0,0,8],
  [8,0,0,0,0,0,0,2,0],
  [0,7,0,0,1,0,5,0,0],
  [4,0,0,1,0,5,3,0,0],
  [0,1,0,0,7,0,0,0,6],
  [7,0,3,2,0,0,0,8,0],
  [0,6,0,5,0,0,0,0,9],
  [9,0,4,0,0,0,2,3,0],
  [0,0,0,0,0,9,7,0,0]
];

const sudoku = document.getElementById("sudoku");
const cells = [];
let availableHints = parseInt(localStorage.getItem('sudoku_hints') || 0);

function updateHintDisplay() {
    const hintsDiv = document.getElementById('hints');
    hintsDiv.textContent = `indices disponibles: ${availableHints}`;
    document.getElementById('hintButton').disabled = availableHints <= 0;
}

for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    const cell = document.createElement("input");
    cell.type = "text";
    cell.maxLength = 1;
    cell.className = "sudoku-cell";
    cell.dataset.row = r;
    cell.dataset.col = c;

    if (puzzle[r][c] !== 0) {
      cell.value = puzzle[r][c];
      cell.classList.add("prefilled");
      cell.readOnly = true;
      cell.addEventListener("keydown", e => {
        e.preventDefault();
      });
    }
  
    cell.addEventListener("input", e => {
      if (!/^[1-9]$/.test(e.target.value)) e.target.value = "";
    });

    cell.addEventListener("focus", () => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      highlightCell(row, col);
    });

    cell.addEventListener("keydown", e => {
      const rr = parseInt(cell.dataset.row);
      const cc = parseInt(cell.dataset.col);
      if (e.key === "ArrowRight") focusCell(rr, cc + 1);
      if (e.key === "ArrowLeft") focusCell(rr, cc - 1);
      if (e.key === "ArrowDown") focusCell(rr + 1, cc);
      if (e.key === "ArrowUp") focusCell(rr - 1, cc);
    });

    sudoku.appendChild(cell);
    cells.push(cell);
  }
}

function highlightCell(row, col) {
  const clickedCell = cells[row * 9 + col];
  const value = clickedCell.value;

  cells.forEach(c => {
    c.classList.remove("active");
    c.classList.remove("highlight-block");
    c.classList.remove("same-value");
  });

  const blockRow = Math.floor(row / 3);
  const blockCol = Math.floor(col / 3);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cellIndex = r * 9 + c;
      const cell = cells[cellIndex];
      const cellBlockRow = Math.floor(r / 3);
      const cellBlockCol = Math.floor(c / 3);

      if (r === row || c === col) {
        cell.classList.add("active");
      } else if (cellBlockRow === blockRow && cellBlockCol === blockCol) {
        cell.classList.add("highlight-block");
      }

      if (value && cell.value === value) {
        cell.classList.add("same-value");
      }
    }
  }
}

function focusCell(r, c) {
  if (r < 0 || r > 8 || c < 0 || c > 8) return;
  cells[r * 9 + c].focus();
}

document.getElementById("hintButton").addEventListener("click", () => {
  if (availableHints <= 0) return;
  
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = cells[r * 9 + c];
      if (!cell.classList.contains('prefilled') && !cell.value) {
        cell.value = solution[r][c];
        cell.style.color = '#9dffcf';
        availableHints--;
        localStorage.setItem('sudoku_hints', availableHints);
        updateHintDisplay();
        return;
      }
    }
  }
});

updateHintDisplay();

document.getElementById("checkButton").addEventListener("click", () => {
  let ok = true;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = cells[r * 9 + c];
      const val = parseInt(cell.value);
      if (val === solution[r][c]) {
        cell.classList.add("locked");
        cell.readOnly = true;
      } else {
        ok = false;
      }
    }
  }

  const fb = document.getElementById("feedback");
  if (ok) {
    fb.className = "correct";
    fb.textContent = "t'es vraiment super méga trop fort waw!";
    setTimeout(() => window.location.href = "/mot/", 1500);
  } else {
    fb.className = "wrong";
    fb.textContent = "eh t'as pas fini encore";
  }
});

(() => {
  const first = sudoku.querySelector("input:not(.prefilled)");
  if (first) first.focus();
})();
</script>
