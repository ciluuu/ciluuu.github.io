---
layout: default
title: accueil
permalink: /
---

<style>
body {
    background: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    min-height: 100vh;
    text-align: center;
}

h1 {
    color: #e0e0e0;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 30px;
}

button {
    padding: 12px 25px;
    background: #eb2cbbff;
    color: #121212;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background: #fd70f4;
    color: #121212;
}

a {
    color: #eb2cbbff;
    text-decoration: none;
}

/* Nouveau : message d'erreur prénom */
#errorMessage {
    color: #fd70f4;
    margin-top: 10px;
    font-weight: bold;
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

<h1>cadeau #24</h1>
<div id="loadingScreen">
    <div class="spinner"></div>
    <p>chargement...</p>
</div>
<p>bonne chance</p>

<p>entre ton prénom</p>

<input type="text" id="nameInput" placeholder="ton prénom" style="padding:10px; font-size:16px;">
<button id="startButton">commencer</button>

<div id="errorMessage"></div>

<script>

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 800);
});


function checkName() {
    const name = document.getElementById('nameInput').value.trim().toLowerCase();
    const errorDiv = document.getElementById('errorMessage');

    if(name === 'noah') {
        window.location.href = '/mots-croises/';
    } else if(name === 'emilie') {
        window.location.href = '/mots-croises/';
    } else if(name === 'lucie') {
        window.location.href = '/mots-croises/';
    } else {
        errorDiv.textContent = "tu n'as pas le droit d'accéder à ce cadeau.";
    }
}

document.getElementById('startButton').addEventListener('click', checkName);


document.getElementById('nameInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkName();
    }
});

</script>

<!-- <a href="/motscroises/"><button>prêt?</button></a> -->
