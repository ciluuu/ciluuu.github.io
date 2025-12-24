---
layout: default
title: noah
permalink: /sudoku/
---

<h1>coucou noah</h1>
<p>aujourd'hui ce n'est pas ton anniversaire</p>
<p>mais aujourd'hui tu sais quel jour on est?</p>
<p>c'est noël hihi</p>

<div id="loadingScreen">
    <div class="spinner"></div>
    <p>chargement...</p>
</div>

<div class="content-wrapper">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <div id="wheel-container">
            <canvas id="wheel" width="1000" height="1000"></canvas>
            <div id="pointer"></div>
        </div>
        <button id="spinButton">tourner la roue</button>
        <div id="result"></div>
    </div>
</div>

<style>
body {
    background: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    padding: 40px;
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 { color: #ffffff; margin-bottom: 20px; }
p { color: #cccccc; margin-bottom: 15px; }
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

button:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.6;
}

#loadingScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #121212;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #333;
    border-top: 5px solid #fd70f4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>

<style>
#wheel-container {
    position: relative;
    margin: 80px 0 30px 0;
}

#wheel {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(253, 112, 244, 0.3);
}

#pointer {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 40px solid #fd70f4;
    z-index: 10;
}

#result {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #fd70f4;
    min-height: 60px;
    text-align: center;
}
</style>

<script>

    window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 800);
});

let canSpin = true;
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

const segments = [
    { text: 'relance', gift: 'le droit de relancer la roue', color: '#eb2cbb', action: 'retry' },
    { text: 'c\est ok', gift: 'un sudoku', color: '#ae57ffff', action: 'sudoku' },
    { text: 'relance', gift: 'le droit de relancer la roue', color: '#eb2cbb', action: 'retry' },
    { text: 'force', gift: 'un sudoku super dur', color: '#e80074ff', action: 'death' },
    { text: 'indice', gift: 'un indice', color: '#fd70f4', action: 'retry' },
    { text: 'c\'est ok', gift: 'un sudoku', color: '#ae57ffff', action: 'sudoku' }
];

let currentAngle = 0;
let isSpinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 480;
    const anglePerSegment = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((segment, i) => {
        const startAngle = currentAngle + i * anglePerSegment - Math.PI / 2;
        const endAngle = startAngle + anglePerSegment;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#121212';
        ctx.font = 'bold 40px Segoe UI';
        ctx.fillText(segment.text, radius * 0.65, 0);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#1b1b1b';
    ctx.fill();
    ctx.strokeStyle = '#fd70f4';
    ctx.lineWidth = 10;
    ctx.stroke();
}

function spin() {
    if (isSpinning || !canSpin) return;
    isSpinning = true;
    canSpin = false;
    resultDiv.textContent = '';
    spinButton.disabled = true;

    const spinTime = 3000 + Math.random() * 2000;
    const spinAngle = 10 + Math.random() * 10;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinTime, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        currentAngle = easeOut * spinAngle * 2 * Math.PI;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const anglePerSegment = (2 * Math.PI) / segments.length;
            const normalizedAngle = ((2 * Math.PI) - (currentAngle % (2 * Math.PI))) % (2 * Math.PI);
            const segmentIndex = Math.floor(normalizedAngle / anglePerSegment) % segments.length;
            const segment = segments[segmentIndex];
            
            resultDiv.textContent = `tu as gagné: ${segment.gift}!`;
            
            setTimeout(() => {
                if (segment.action === 'death') {
                    resultDiv.innerHTML += '<br><span style="color: #e80074ff;">chargement</span>';
                    setTimeout(() => window.location.href = '/sudoku-un-peu-dur-hihi/', 2000);
                } else if (segment.action === 'sudoku') {
                    resultDiv.innerHTML += '<br><span style="color: #ae57ffff;">chargement</span>';
                    setTimeout(() => window.location.href = '/sudoku-simple-promis/', 2000);
                } else if (segment.action === 'retry') {
                    canSpin = true;
                    spinButton.disabled = false;
                    resultDiv.innerHTML += '<br><span style="color: #fd70f4;">tu peux relancer la roue!</span>';
                }
                
                isSpinning = false;
            }, 500);
        }
    }

    animate();
}

spinButton.addEventListener('click', spin);
drawWheel();
</script>
