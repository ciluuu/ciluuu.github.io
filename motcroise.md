---
layout: default
title: mots croisés
permalink: /mots-croises/
---

<h1>étape 1: mots croisés</h1>
<p>trouve tous les mots pour pouvoir accéder à la suite</p>

<style>
body {
    background: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    width: 75%;
    margin: 0 auto;
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

button {
    padding: 12px 25px;
    background: #fd70f4;
    color: #121212;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 20px;
}

button:hover {
    background: #eb2cbbff;
}

#crossword-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    width: 100%;
    margin-top: 40px;
}

#crossword-box {
    background: #1b1b1b;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 0 10px #0008;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: max-content;
}

#crossword {
    display: grid;
    gap: 0;
    margin-top: 10px;
}

.crossword-cell {
    width: 45px;
    height: 45px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    border: 1px solid #444;
    background: #1b1b1b;
    color: #e0e0e0;
    outline: none;
    box-sizing: border-box;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
    position: relative;
}

.crossword-cell:focus {
    background: #2a2a2a;
    color: #fd70f4;
}

.crossword-cell.locked {
    background: #252525;
    color: #fd70f4;
    pointer-events: auto;
}

.crossword-cell.active {
    background: #35223a;
}

.crossword-cell.empty {
    background: transparent;
    border: none;
    pointer-events: none;
}

#crossword-clues {
    width: 450px;
    background: #1b1b1b;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px #0008;
}

#crossword-clues h2 {
    margin-top: 0;
    color: white;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}

#crossword-clues h3 {
    color: #fd70f4;
    margin-top: 20px;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}

#crossword-clues ol {
    padding-left: 20px;
}

#crossword-clues li.active {
    color: #fd70f4;
    font-weight: bold;
}

#feedback {
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 8px;
    text-align: center;
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

<div id="crossword-wrapper">
    <div id="crossword-box">
        <div id="crossword"></div>
        <button id="checkButton">vérifier</button>
        <div id="feedback"></div>
    </div>
    <div id="crossword-clues">
        <h2>indices</h2>
        <div style="display:flex; gap:30px;">
            <div>
                <h3 style="color:#eb2cbbff;">horizontal</h3>
                <ol id="hClues" style="padding-left:20px; margin:0;">
                    <li>176 marches</li>
                    <li>princesse</li>
                    <li>ton ennemi</li>
                    <li>tu connais?</li>
                    <li>toi</li>
                    <li>petit</li>
                </ol>
            </div>
            <div>
                <h3 style="color:#eb2cbbff;">vertical</h3>
                <ol id="vClues" style="padding-left:20px; margin:0;">
                    <li>regelegorilla</li>
                    <li>3-0</li>
                    <li>09/01</li>
                    <li>22 ans</li>
                    <li>#chipie</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<script>
const solution = [
  ['','','','','','','','o','','','','','','',''],
  ['d','','','','','','','p','','','','','','',''],
  ['e','','','','a','b','b','e','s','s','e','s','','',''],
  ['m','','','','','r','','r','','','','i','','',''],
  ['e','m','i','l','i','e','','a','l','i','','p','','',''],
  ['n','','','','','s','','','','','','','','',''],
  ['t','','','','','t','','','m','a','c','a','r','o','n'],
  ['i','','','','','','','','a','','','n','','',''],
  ['a','','','','','n','o','i','r','','','d','','',''],
  ['','','','','','','','','a','','','','','',''],
  ['1','','','','','','','','t','','','g','','',''],
  ['3','','','','','','','','h','','','o','','',''],
  ['','','','','','','t','h','o','m','a','s','','',''],
  ['','','','','','','','','n','','','s','','',''],
  ['','','','','','','','','','','','i','','',''],
  ['','','','','','','','','','','','p','','',''],
  ['','','','','','','','','','','','','','','']
];

// const horizontalWords = [
//     {row:2,start:2,length:10,clueIndex:0},
//     {row:0,start:7,length:1,clueIndex:1},
//     {row:6,start:4,length:7,clueIndex:2},
//     {row:8,start:6,length:5,clueIndex:3},
//     {row:5,start:8,length:3,clueIndex:4},
//     {row:6,start:12,length:4,clueIndex:5}
// ];

// const verticalWords = [
//     {col:1,start:0,length:5,clueIndex:0},
//     {col:2,start:5,length:3,clueIndex:1},
//     {col:0,start:7,length:4,clueIndex:2},
//     {col:6,start:8,length:5,clueIndex:3},
//     {col:2,start:11,length:3,clueIndex:4}
// ];

const horizontalWords = [
    {row:2, start:4, length:8, clueIndex:0}, // abbesses
    {row:4, start:0, length:6, clueIndex:1}, // emilie
    {row:4, start:7, length:3, clueIndex:2},  // ali
    {row:6, start:8, length:7, clueIndex:3}, // macaron
    {row:8, start:5, length:4, clueIndex:4}, // noir
    {row:12, start:6, length:6, clueIndex:5}, // thomas
];

const verticalWords = [
    {col:0, start:1, length:11, clueIndex:0}, // dementia
    {col:5, start:2, length:5, clueIndex:1}, // brest
    {col:7, start:0, length:5, clueIndex:2}, // opera
    {col:8, start:6, length:8, clueIndex:3}, // marathon 
    {col:11, start:2, length:14, clueIndex:4} // sip and gossip
];

function highlightWord(r,c){
    clearActive();
    clearClueHighlight();

    horizontalWords.forEach(w=>{
        if(w.row === r && c >= w.start && c < w.start + w.length){
            for(let i=0;i<w.length;i++){
                cells[r*cols + w.start + i].classList.add('active');
            }
            document.querySelectorAll('#hClues li')[w.clueIndex].classList.add('active');
        }
    });

    verticalWords.forEach(w=>{
        if(w.col === c && r >= w.start && r < w.start + w.length){
            for(let i=0;i<w.length;i++){
                cells[(w.start + i)*cols + w.col].classList.add('active');
            }
            document.querySelectorAll('#vClues li')[w.clueIndex].classList.add('active');
        }
    });
}

const crossword = document.getElementById('crossword');
const rows = solution.length;
const cols = solution[0].length;
crossword.style.gridTemplateColumns = `repeat(${cols},45px)`;

const cells = [];
solution.forEach((row,r)=>{
    row.forEach((val,c)=>{
        const cell = document.createElement('input');
        cell.type='text';
        cell.maxLength=1;
        cell.className='crossword-cell';
        cell.dataset.row=r;
        cell.dataset.col=c;
        if(val==='') cell.classList.add('empty');
        crossword.appendChild(cell);
        cells.push(cell);
    });
});

function clearActive() { cells.forEach(c=>c.classList.remove('active')); }
function clearClueHighlight() { document.querySelectorAll('#hClues li,#vClues li').forEach(li=>li.classList.remove('active')); }

function highlightWord(r,c){
    clearActive();
    clearClueHighlight();
    horizontalWords.forEach(w=>{
        if(w.row===r && c>=w.start && c<w.start+w.length){
            for(let i=0;i<w.length;i++) cells[r*cols+w.start+i].classList.add('active');
            document.querySelectorAll('#hClues li')[w.clueIndex].classList.add('active');
        }
    });
    verticalWords.forEach(w=>{
        if(w.col===c && r>=w.start && r<w.start+w.length){
            for(let i=0;i<w.length;i++) cells[(w.start+i)*cols+w.col].classList.add('active');
            document.querySelectorAll('#vClues li')[w.clueIndex].classList.add('active');
        }
    });
}

cells.forEach(cell=>{
    if(!cell.classList.contains('empty')){
        cell.addEventListener('focus',()=>highlightWord(+cell.dataset.row,+cell.dataset.col));
        cell.addEventListener('keydown',e=>{
            const rr=+cell.dataset.row, cc=+cell.dataset.col;
            if(e.key==='ArrowRight') move(rr,cc,0,1);
            if(e.key==='ArrowLeft') move(rr,cc,0,-1);
            if(e.key==='ArrowDown') move(rr,cc,1,0);
            if(e.key==='ArrowUp') move(rr,cc,-1,0);
        });
    }
});

function move(r,c,dr,dc){
    let nr=r+dr,nc=c+dc;
    while(nr>=0 && nr<rows && nc>=0 && nc<cols && cells[nr*cols+nc].classList.contains('empty')){
        nr+=dr; nc+=dc;
    }
    if(nr>=0 && nr<rows && nc>=0 && nc<cols) cells[nr*cols+nc].focus();
}

document.getElementById('checkButton').onclick=()=>{
    let ok=true;
    solution.forEach((row,r)=>{row.forEach((val,c)=>{
        if(val!==''){
            const cell = cells[r*cols+c];
            const userVal = cell.value.toUpperCase();
            const correctVal = val.toUpperCase();
            
            if(userVal === correctVal) {
                cell.classList.add('locked');
                cell.readOnly = true;  
            } else {
                ok=false;
            }
        }
    })});
    const fb = document.getElementById('feedback');
    if(ok){ 
        fb.className='correct'; 
        fb.textContent="trop fort t'as tout trouvé!"; 
        setTimeout(()=>location.href='/sudoku/',1500);
    } else { 
        fb.className='wrong'; 
        fb.textContent="au moins un mot est incorrect"; 
    }
};
</script>
