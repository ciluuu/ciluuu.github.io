---
layout: default
title: wordle
permalink: /mot/
---


<h1>étape suivante: wordle</h1>
<p>trouve le mot de 5 lettres</p>


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

#wordle-container {
    background: #1b1b1b;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 0 10px #0008;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

#loading {
    font-size: 18px;
    color: #fd70f4;
}

#grid {
    display: grid;
    grid-template-rows: repeat(6, 60px);
    gap: 5px;
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 60px);
    gap: 5px;
}

.cell {
    width: 60px;
    height: 60px;
    border: 2px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    color: #e0e0e0;
    background: #1b1b1b;
    border-radius: 4px;
    transition: all 0.3s;
    outline: none;
    cursor: pointer;
    text-align: center;
    padding: 0;
}

.cell:focus {
    border-color: #fd70f4;
    box-shadow: 0 0 0 2px #fd70f4;
}

.cell.filled {
    border-color: #666;
}

.cell.active-row {
    background: #252125;
}

.cell.correct {
    background: #35223a;
    border-color: #eb2cbb;
    color: #fd70f4;
}

.cell.present {
    background: #3a3a2a;
    border-color: #8a7a4a;
    color: #ffd89d;
}

.cell.absent {
    background: #252525;
    border-color: #444;
    color: #666;
}

#keyboard {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
}

.keyboard-row {
    display: flex;
    gap: 5px;
    justify-content: center;
}

.key {
    min-width: 40px;
    height: 50px;
    padding: 0 10px;
    background: #2a2a2a;
    border: none;
    border-radius: 4px;
    color: #e0e0e0;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.key:hover {
    background: #3a3a3a;
}

.key.correct {
    background: #35223a;
    color: #fd70f4;
}

.key.present {
    background: #3a3a2a;
    color: #ffd89d;
}

.key.absent {
    background: #1a1a1a;
    color: #444;
}

#feedback {
    margin-top: 15px;
    font-size: 18px;
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


<div id="wordle-container">
    <div id="loading">chargement des mots...</div>
    <div id="grid"></div>
    <div id="keyboard"></div>
    <div id="feedback"></div>
</div>


<script>
const WORD = 'MAGMA';
const MAX_ATTEMPTS = 6;

let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let VALID_WORDS = [];
let wordsLoaded = false;
let rowsCompleted = [];

const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const feedback = document.getElementById('feedback');
const guesses = ['', '', '', '', '', ''];

const keyboardLayout = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['W', 'X', 'C', 'V', 'B', 'N']
];

fetch('/mots5.json')
    .then(response => response.json())
    .then(data => {
        VALID_WORDS = data.map(w => w.toUpperCase());
        wordsLoaded = true;
        document.getElementById('loading').style.display = 'none';
    })
    .catch(e => console.error('Erreur', e));

for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.maxLength = 1;
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        
        cell.addEventListener('input', e => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            
            if (r !== currentRow || rowsCompleted.includes(r)) {
                e.target.value = '';
                return;
            }
            
            const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
            
            if (val) {
                e.target.value = val;
                
                let currentGuess = guesses[currentRow];
                let letters = currentGuess.split('');
                while (letters.length < 5) letters.push('');
                letters[c] = val;
                guesses[currentRow] = letters.join('').replace(/\s+$/, '');
                
                if (c < 4) {
                    currentCol = c + 1;
                    document.querySelector(`[data-row="${r}"][data-col="${currentCol}"]`).focus();
                }
            } else {
                e.target.value = '';
            }
        });
        
        cell.addEventListener('focus', () => {
            const r = parseInt(cell.dataset.row);
            if (r !== currentRow || rowsCompleted.includes(r)) {
                return;
            }
            currentCol = parseInt(cell.dataset.col);
            highlightRow(currentRow);
        });
        
        cell.addEventListener('keydown', e => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            
            if (r !== currentRow) return;
            
            if (e.key === 'ArrowRight' && c < 4) {
                e.preventDefault();
                document.querySelector(`[data-row="${r}"][data-col="${c + 1}"]`).focus();
            } else if (e.key === 'ArrowLeft' && c > 0) {
                e.preventDefault();
                document.querySelector(`[data-row="${r}"][data-col="${c - 1}"]`).focus();
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                let currentGuess = guesses[currentRow];
                let letters = currentGuess.split('');
                while (letters.length < 5) letters.push('');
                
                if (letters[c]) {
                    letters[c] = '';
                    e.target.value = '';
                } else if (c > 0) {
                    letters[c - 1] = '';
                    document.querySelector(`[data-row="${r}"][data-col="${c - 1}"]`).value = '';
                    document.querySelector(`[data-row="${r}"][data-col="${c - 1}"]`).focus();
                }
                
                guesses[currentRow] = letters.join('').replace(/\s+$/, '');
            } else if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
        
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

keyboardLayout.forEach(row => {
    const keyRow = document.createElement('div');
    keyRow.className = 'keyboard-row';
    row.forEach(key => {
        const keyBtn = document.createElement('button');
        keyBtn.className = 'key';
        keyBtn.textContent = key;
        keyBtn.dataset.key = key;
        keyBtn.addEventListener('click', () => handleKey(key));
        keyRow.appendChild(keyBtn);
    });
    keyboard.appendChild(keyRow);
});

function highlightRow(row) {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('active-row');
    });
    for (let i = 0; i < 5; i++) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${i}"]`);
        if (!cell.classList.contains('correct') && !cell.classList.contains('present') && !cell.classList.contains('absent')) {
            cell.classList.add('active-row');
        }
    }
}

function handleKey(key) {
    if (gameOver) return;

    if (key === 'ENTER') {
        if (guesses[currentRow].length === 5) {
            submitGuess();
        }
    } else if (/^[A-Z]$/.test(key)) {
        const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
        if (cell && currentCol < 5) {
            cell.value = key;
            cell.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
}

function submitGuess() {
    const guess = guesses[currentRow];
    if (!guess || guess.length !== 5) return;
    
    if (!wordsLoaded) {
        feedback.className = 'wrong';
        feedback.textContent = 'patiente, les mots se chargent...';
        setTimeout(() => feedback.textContent = '', 2000);
        return;
    }
    
    if (!VALID_WORDS.includes(guess)) {
        feedback.className = 'wrong';
        feedback.textContent = 'ce mot n\'existe pas';
        setTimeout(() => feedback.textContent = '', 2000);
        return;
    }
    
    rowsCompleted.push(currentRow);
    
    const letterCount = {};
    for (let letter of WORD) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    const result = Array(5).fill('absent');
    for (let i = 0; i < 5; i++) {
        if (guess[i] === WORD[i]) {
            result[i] = 'correct';
            letterCount[guess[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === 'absent' && WORD.includes(guess[i]) && letterCount[guess[i]] > 0) {
            result[i] = 'present';
            letterCount[guess[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
        cell.readOnly = true;
        setTimeout(() => {
            cell.classList.add(result[i]);
        }, i * 150);
        
        const keyBtn = document.querySelector(`[data-key="${guess[i]}"]`);
        if (keyBtn) {
            const currentClass = keyBtn.classList.contains('correct') ? 'correct' : 
                                keyBtn.classList.contains('present') ? 'present' : '';
            if (result[i] === 'correct' || (result[i] === 'present' && currentClass !== 'correct')) {
                keyBtn.classList.remove('absent', 'present', 'correct');
                keyBtn.classList.add(result[i]);
            } else if (result[i] === 'absent' && !currentClass) {
                keyBtn.classList.add('absent');
            }
        }
    }

    setTimeout(() => {
        if (guess === WORD) {
            feedback.className = 'correct';
            feedback.textContent = 'vraiment t\'es trop fort aujourd\'hui! waaaw';
            gameOver = true;
            setTimeout(() => window.location.href = '/puzzle/', 2000);
        } else if (currentRow === MAX_ATTEMPTS - 1) {
            feedback.className = 'wrong';
            feedback.textContent = `perdu! le mot était ${WORD}`;
            gameOver = true;
        } else {
            currentRow++;
            currentCol = 0;
            highlightRow(currentRow);
            document.querySelector(`[data-row="${currentRow}"][data-col="0"]`).focus();
        }
    }, 750);
}

document.addEventListener('keydown', e => {
    if (gameOver) return;
    
    if (e.key === 'Enter') {
        e.preventDefault();
        handleKey('ENTER');
    } else if (e.key === 'Backspace') {
        e.preventDefault();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleKey(e.key.toUpperCase());
    }
});

setTimeout(() => {
    highlightRow(0);
    document.querySelector(`[data-row="0"][data-col="0"]`).focus();
}, 100);
</script>
