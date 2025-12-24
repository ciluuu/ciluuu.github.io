---
layout: default
title: puzzle
permalink: /puzzle/
---


<h1>puzzle</h1>
<p>reconstitue l'image pour continuer</p>


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

#puzzle-container {
    background: #1b1b1b;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 0 10px #0008;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    gap: 5px;
    margin-top: 20px;
}

.puzzle-piece {
    width: 150px;
    height: 150px;
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background-size: 450px 450px;
    background-repeat: no-repeat;
}

.puzzle-piece:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(253, 112, 244, 0.5);
}

.puzzle-piece.selected {
    border-color: #fd70f4;
    box-shadow: 0 0 20px rgba(253, 112, 244, 0.8);
}

.puzzle-piece.correct {
    border-color: #eb2cbb;
    pointer-events: none;
}

#feedback {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #fd70f4;
    min-height: 30px;
}
</style>


<div id="puzzle-container">
    <div id="puzzle-grid"></div>
    <div id="feedback"></div>
</div>


<script>
const IMAGE_URL = '/assets/img/puzzle-image.jpeg';
const solution = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
let selected = null;

function renderPuzzle() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';

    pieces.forEach((pieceNum, currentIndex) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.index = currentIndex;

        const row = Math.floor(pieceNum / 3);
        const col = pieceNum % 3;
        piece.style.backgroundImage = `url(${IMAGE_URL})`;
        piece.style.backgroundPosition = `-${col * 150}px -${row * 150}px`;

        if (pieceNum === solution[currentIndex]) {
            piece.classList.add('correct');
        }

        piece.addEventListener('click', () => selectPiece(currentIndex));
        grid.appendChild(piece);
    });
}

function selectPiece(index) {
    if (pieces[index] === solution[index]) return;

    if (selected === null) {
        selected = index;
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    } else {
        if (selected === index) {
            document.querySelector(`[data-index="${index}"]`).classList.remove('selected');
            selected = null;
        } else {
            [pieces[selected], pieces[index]] = [pieces[index], pieces[selected]];
            selected = null;
            renderPuzzle();
            checkWin();
        }
    }
}

function checkWin() {
    if (JSON.stringify(pieces) === JSON.stringify(solution)) {
        document.getElementById('feedback').textContent = 't\'es trop fort je suis carrément impressionnée!';
        setTimeout(() => window.location.href = '/diaporama/', 2000);
    }
}

renderPuzzle();
</script>
